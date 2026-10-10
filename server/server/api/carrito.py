from app import app
import sqlite3
from flask import Flask, request, jsonify

db = sqlite3.connect('server/db/datos.db', check_same_thread=False)
db.row_factory = sqlite3.Row

#habilita las claves foraneas
db.execute("PRAGMA foreign_keys = ON")

init_compras= """
  CREATE TABLE IF NOT EXISTS compras(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    correo TEXT NOT NULL,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    telefono TEXT NOT NULL,
    calle TEXT NOT NULL,
    depo TEXT,
    region TEXT NOT NULL,
    comuna TEXT NOT NULL,
    indicacion TEXT,
    total REAL NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE SET NULL
  )
"""

db.execute(init_compras)
db.commit()

#registrar compra
@app.post('/api/compras')
def registrarCompra():
    body = request.get_json() or {}

    correo = body.get('correo')
    nombre = body.get('nombre')
    apellido = body.get('apellido')
    telefono = body.get('telefono')
    calle = body.get('calle')
    depo = body.get('depo')
    region = body.get('region')
    comuna = body.get('comuna')
    indicacion = body.get('indicacion')
    total = body.get('total')

    #valida que todos los campos esten completos
    if not correo or not nombre or not apellido or not telefono or not calle or not region or not comuna or total is None:
        return jsonify({'ok': False, 'error': 'Faltan campos obligatorios para el envio'}), 400

    usuario = db.execute('SELECT id FROM usuarios WHERE correo = ?', (correo,)).fetchone()
    usuario_id = usuario['id'] if usuario else None

    cursor = db.execute(
        '''INSERT INTO compras
           (usuario_id, correo, nombre, apellido, telefono, calle, depo, region, comuna, indicacion, total)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
        (usuario_id, correo, nombre, apellido, telefono, calle, depo, region, comuna, indicacion, total)
    )
    db.commit()

    return jsonify({
        'ok': True,
        'mensaje': 'Compra registrada exitosamente',
        'compra_id': cursor.lastrowid
    }), 201


#obtener las compras registadas
@app.get('/api/compras')
def obtenerCompras():
    rows = db.execute('SELECT * FROM compras ORDER BY fecha DESC').fetchall()
    compras = [dict(row) for row in rows]
    return jsonify({'ok': True, 'compras': compras})


#obtener comprar por id de usuario
@app.get('/api/compras/usuario/<int:usuario_id>')
def obtenerComprasID(usuario_id):
    rows = db.execute('SELECT * FROM compras WHERE usuario_id = ? ORDER BY fecha DESC', (usuario_id,)).fetchall()
    compras = [dict(row) for row in rows]
    return jsonify({'ok': True, 'compras': compras})

#obtener comprar por id
@app.get('/api/compras/<int:id>')
def obtenerCompraPorID(id):
    row = db.execute('SELECT * FROM compras WHERE id = ?', (id,)).fetchone()
    if not row:
        return jsonify({'ok': False, 'error': 'Compra no encontrada'}), 404
    
    return jsonify({'ok': True, 'compra': dict(row)})