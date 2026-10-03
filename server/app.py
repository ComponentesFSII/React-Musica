import sqlite3
from flask import Flask, request, jsonify, Response

db = sqlite3.connect('server/db/usuarios.db', check_same_thread=False)
db.row_factory = sqlite3.Row

init = """
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_completo Text NOT NULL,
    correo TEXT UNIQUE NOT NULL,
    contrasena TEXT NOT NULL,
    rut TEXT NOT NULL,
    telefono TEXT NOT NULL,
    region TEXT NOT NULL,
    comuna TEXT NOT NULL
  )
"""

db.execute(init)
db.commit()

app = Flask('api')
app.json.ensure_ascii = False


@app.post('/api/login')
def login():
    body = request.get_json()
    print(body)
    correo = body.get('correo')
    contrasena = body.get('contrasena')
    row = db.execute(
        'SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?',
        (correo, contrasena),
    ).fetchone()
    return jsonify(dict(row))


@app.post('/api/registro')
def registro():
    body = request.get_json()
    print(body)
    correo = body.get('correo')
    contrasena = body.get('contrasena')
    rut = body.get('rut')
    telefono = body.get('telefono')
    region = body.get('region')
    comuna = body.get('comuna')
    nombre = body.get('nombre_completo')

    cursor = db.execute(
        'INSERT INTO usuarios (correo, contrasena, rut, telefono, region, comuna, nombre_completo) VALUES (?, ?, ?, ?, ?, ?, ?)',
        (correo, contrasena, rut, telefono, region, comuna, nombre),
    )
    db.commit()
    return jsonify({
        'ok': True,
        'usuario': {
            'id': cursor.lastrowid,
            'correo': correo
        },
    })


if __name__ == '__main__':
    print('DB funcionando')
    app.run(port=3000)