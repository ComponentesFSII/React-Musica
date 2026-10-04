import sqlite3
from flask import Flask, request, jsonify, Response

app = Flask('api')
app.json.ensure_ascii = False
#ir agregando mas cosas en el archivo

#tabla de usuarios
db_usuarios = sqlite3.connect('server/db/usuarios.db', check_same_thread=False)
db_usuarios.row_factory = sqlite3.Row

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

db_usuarios.execute(init_usuarios)
db_usuarios.commit()

#tabla de comentarios
db_comentarios = sqlite3.connect('server/db/comentarios.db', check_same_thread=False)
db_comentarios.row_factory = sqlite3.Row

init_comentarios = """
  CREATE TABLE IF NOT EXISTS comentarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_completo TEXT UNIQUE NOT NULL,
    correo TEXT UNIQUE NOT NULL,
    comentario TEXT UNIQUE NOT NULL
  )
"""

db_comentarios.execute(init_comentarios)
db_comentarios.commit()

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
    existe = db_comentarios.execute(
        'SELECT id FROM comentarios WHERE correo = ?',
        (correo,),
    ).fetchone()
    if existe:
        return jsonify({'ok': False, 'error': 'El correo ya esta registrado'}), 400
    
    #insertar el usuario en la base de datos
    cursor = db_comentarios.execute(
        '''INSERT INTO comentarios (correo, nombre_completo, comentario)
            VALUES (?, ?, ?)''',
        (correo, nombre, comentario),
    )
    db_comentarios.commit()

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
    row = db_usuarios.execute(
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
    existe = db_usuarios.execute(
        'SELECT id FROM usuarios WHERE correo = ?',
        (correo,),
    ).fetchone()
    if existe:
        return jsonify({'ok': False, 'error': 'El correo ya está registrado'}), 400
    
    #verificar que las contraseñas sean iguales
    if(contrasena != contrasenaConf):
        return jsonify({'ok': False, 'error': 'Las contraseñas no coinciden'}), 400

    #insertar el usuario en la base de datos
    cursor = db_usuarios.execute(
        '''INSERT INTO usuarios (correo, contrasena, rut, telefono, region, comuna, nombre_completo, rol)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)''',
        (correo, contrasena, rut, telefono, region, comuna, nombre, rol),
    )
    db_usuarios.commit()

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
    rows = db_usuarios.execute('SELECT * FROM usuarios').fetchall()
    usuarios = [dict(row) for row in rows]
    return jsonify({'ok': True, 'usuarios': usuarios})

#obtener un usuario por id
@app.get('/api/usuarios/<int:id>')
def obtenerUsuarioID(id):
    row = db_usuarios.execute('SELECT * FROM usuarios WHERE id = ?', (id,)).fetchone()

    if not row:
        return jsonify({'ok': False, 'error': 'Usuario no encontrado'}), 404
    
    return jsonify({'ok': True, 'usuario': dict(row)})

#eliminar usuarios
@app.delete('/api/usuarios/<int:id>')
def eliminarUsuario(id):
    cursor = db_usuarios.execute('DELETE FROM usuarios WHERE id = ?', (id,))
    db_usuarios.commit()

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
    existe_correo = db_usuarios.execute(
        'SELECT id FROM usuarios WHERE correo = ? AND id != ?',
        (correo, id)
    ).fetchone()

    if existe_correo:
        return jsonify({'ok': False, 'error': 'El correo ya esta registrado'}), 400

    #actualizar la base de datos
    db_usuarios.execute(
        '''UPDATE usuarios 
           SET nombre_completo = ?, rut = ?, correo = ?, telefono = ?, region = ?, comuna = ?, rol = ?
           WHERE id = ?''',
        (nombre, rut, correo, telefono, region, comuna, rol, id)
    )
    db_usuarios.commit()

    return jsonify({'ok': True, 'mensaje': 'Usuario actualizado correctamente'})


#no cambiar
if __name__ == '__main__':
    print('DB funcionando')
    app.run(port=3000)