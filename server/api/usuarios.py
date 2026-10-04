from app import app
import sqlite3
from flask import Flask, request, jsonify

db = sqlite3.connect('server/db/datos.db', check_same_thread=False)
db.row_factory = sqlite3.Row

init_usuarios = """
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_completo Text NOT NULL,
    correo TEXT UNIQUE NOT NULL,
    contrasena TEXT NOT NULL,
    rut TEXT NOT NULL,
    telefono TEXT NOT NULL,
    region TEXT NOT NULL,
    comuna TEXT NOT NULL,
    rol TEXT NOT NULL DEFAULT 'cliente'
  )
"""

db.execute(init_usuarios)
db.commit()

init_comentarios = """
  CREATE TABLE IF NOT EXISTS comentarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_completo TEXT UNIQUE NOT NULL,
    correo TEXT UNIQUE NOT NULL,
    comentario TEXT UNIQUE NOT NULL
  )
"""

db.execute(init_comentarios)
db.commit()

@app.post('/api/comentario')
def comentario():
    body = request.get_json() or {}
    print(body)
    correo = body.get('correo')
    nombre = body.get('nombre_completo')
    comentario = body.get('comentario')

    #validacion de que todos los campos esten llenos
    if not nombre or not correo or not comentario:
        return jsonify({'ok': False, 'error': 'Todos los campos son obligatorios'}), 400
    
    #verificar si el correo ya existe
    existe = db.execute(
        'SELECT id FROM comentarios WHERE correo = ?',
        (correo,),
    ).fetchone()
    if existe:
        return jsonify({'ok': False, 'error': 'El correo ya esta registrado'}), 400
    
    #insertar el usuario en la base de datos
    cursor = db.execute(
        '''INSERT INTO comentarios (correo, nombre_completo, comentario)
            VALUES (?, ?, ?)''',
        (correo, nombre, comentario),
    )
    db.commit()

    return jsonify({
        'ok': True,
        'mensaje': 'Comentario enviado con exito',
        'comentario': {
            'id': cursor.lastrowid,
            'nombre_completo': nombre,
            'correo': correo,
            'comentario': comentario
        },
    })

#inicio de sesion de usuarios
@app.post('/api/login')
def login():
    body = request.get_json() or {}
    print(body)
    correo = body.get('correo')
    contrasena = body.get('contrasena')
    row = db.execute(
        'SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?',
        (correo, contrasena),
    ).fetchone()

    if not row:
        return jsonify({'ok': False, 'error': 'Usuario o contraseña incorrectos'}), 401
    
    return jsonify({'ok': True, 'usuario': dict(row)})

#registro se usuarios
@app.post('/api/registro')
def registro():
    body = request.get_json() or {}
    print(body)
    correo = body.get('correo')
    contrasena = body.get('contrasena')
    contrasenaConf = body.get('contrasenaConf')
    rut = body.get('rut')
    telefono = body.get('telefono')
    region = body.get('region')
    comuna = body.get('comuna')
    nombre = body.get('nombre_completo')
    rol = body.get('rol', 'cliente')

    #verificar si el correo ya existe
    existe = db.execute(
        'SELECT id FROM usuarios WHERE correo = ?',
        (correo,),
    ).fetchone()
    if existe:
        return jsonify({'ok': False, 'error': 'El correo ya está registrado'}), 400
    
    #verificar que las contraseñas sean iguales
    if(contrasena != contrasenaConf):
        return jsonify({'ok': False, 'error': 'Las contraseñas no coinciden'}), 400

    #insertar el usuario en la base de datos
    cursor = db.execute(
        '''INSERT INTO usuarios (correo, contrasena, rut, telefono, region, comuna, nombre_completo, rol)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)''',
        (correo, contrasena, rut, telefono, region, comuna, nombre, rol),
    )
    db.commit()

    return jsonify({
        'ok': True,
        'usuario': {
            'id': cursor.lastrowid,
            'correo': correo,
            'rol': rol
        },
    })

#obtener los usuarios
@app.get('/api/usuarios')
def obtenerUsuarios():
    rows = db.execute('SELECT * FROM usuarios').fetchall()
    usuarios = [dict(row) for row in rows]
    return jsonify({'ok': True, 'usuarios': usuarios})

#obtener un usuario por id
@app.get('/api/usuarios/<int:id>')
def obtenerUsuarioID(id):
    row = db.execute('SELECT * FROM usuarios WHERE id = ?', (id,)).fetchone()

    if not row:
        return jsonify({'ok': False, 'error': 'Usuario no encontrado'}), 404
    
    return jsonify({'ok': True, 'usuario': dict(row)})

#eliminar usuarios
@app.delete('/api/usuarios/<int:id>')
def eliminarUsuario(id):
    cursor = db.execute('DELETE FROM usuarios WHERE id = ?', (id,))
    db.commit()

    if(cursor.rowcount == 0):
        return jsonify({'ok': False, 'error': 'Usuario no encontrado'}), 404

    return jsonify({'ok': True, 'mensaje': 'Usuario eliminado correctamente'}), 200

#actualiza los datos del usuario
@app.put('/api/usuarios/<int:id>')
def actualizar_usuario(id):
    body = request.get_json() or {}
    correo = body.get('correo')
    rut = body.get('rut')
    telefono = body.get('telefono')
    region = body.get('region')
    comuna = body.get('comuna')
    nombre = body.get('nombre_completo')
    rol = body.get('rol')

    #validacion de que el correo no esta registrado
    existe_correo = db.execute(
        'SELECT id FROM usuarios WHERE correo = ? AND id != ?',
        (correo, id)
    ).fetchone()

    if existe_correo:
        return jsonify({'ok': False, 'error': 'El correo ya esta registrado'}), 400

    #actualizar la base de datos
    db.execute(
        '''UPDATE usuarios 
           SET nombre_completo = ?, rut = ?, correo = ?, telefono = ?, region = ?, comuna = ?, rol = ?
           WHERE id = ?''',
        (nombre, rut, correo, telefono, region, comuna, rol, id)
    )
    db.commit()

    return jsonify({'ok': True, 'mensaje': 'Usuario actualizado correctamente'})

#contar usuarios
@app.get('/api/usuarios/count')
def contarUsuarios():
    row = db.execute('SELECT COUNT(*) as total FROM usuarios').fetchone()
    return jsonify({'ok': True, 'total': row['total']})
