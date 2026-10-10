import sqlite3
from flask import request, jsonify
from app import app

db = sqlite3.connect('server/db/datos.db', check_same_thread=False)
db.row_factory = sqlite3.Row
db.execute("PRAGMA foreign_keys = ON")


innit_categorias = """
CREATE TABLE IF NOT EXISTS categorias (
    id_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_categoria TEXT NOT NULL UNIQUE
)
"""
db.execute(innit_categorias)

innit_productos = """
CREATE TABLE IF NOT EXISTS productos (
    id_producto INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo TEXT NOT NULL UNIQUE,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio REAL NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    imagen_url TEXT,
    categoria_id INTEGER,
    FOREIGN KEY (categoria_id) REFERENCES categorias (id_categoria)
)
"""
db.execute(innit_productos)
db.commit()

@app.get('/api/productos')
def obtenerProductos():
    query = """
        SELECT p.*, c.nombre_categoria AS categoria_nombre 
        FROM productos p 
        LEFT JOIN categorias c ON p.categoria_id = c.id_categoria
    """
    rows = db.execute(query).fetchall()
    productos = [dict(row) for row in rows]
    return jsonify({'ok': True, 'productos': productos})


@app.get('/api/productos/<codigo>')
def obtenerProductosByCodigo(codigo):
    query = """
        SELECT p.*, c.nombre_categoria AS categoria_nombre 
        FROM productos p 
        LEFT JOIN categorias c ON p.categoria_id = c.id_categoria
        WHERE p.codigo = ?
    """
    row = db.execute(query, (codigo,)).fetchone()
    
    if not row:
        return jsonify({'ok': False, 'mensaje': f"Producto con código '{codigo}' no encontrado"}), 404
    
    return jsonify({
        'ok': True,
        'producto': dict(row)
    }), 200


@app.post('/api/productos')
def registrarProducto():
    body = request.get_json() or {}

    codigo = body.get('codigo')
    nombre = body.get('nombre')
    descripcion = body.get('descripcion')
    precio = body.get('precio')
    stock = body.get('stock', 0)
    imagen = body.get('imagen')
    nombre_categoria = body.get('nombre_categoria')

    if not codigo or not nombre or precio is None:
        return jsonify({'ok': False, 'error': 'Faltan campos obligatorios'}), 400

    categoria_id = None
    if nombre_categoria:
        categoria = db.execute('SELECT id_categoria FROM categorias WHERE nombre_categoria = ?', (nombre_categoria,)).fetchone()
        if categoria:
            categoria_id = categoria['id_categoria']

    cursor = db.execute(
        '''INSERT INTO productos (codigo, nombre, descripcion, precio, stock, imagen_url, categoria_id)
           VALUES (?, ?, ?, ?, ?, ?, ?)''',
        (codigo, nombre, descripcion, precio, stock, imagen, categoria_id)
    )
    db.commit()

    return jsonify({
        'ok': True,
        'mensaje': 'Producto registrado exitosamente',
        'producto_id': cursor.lastrowid
    }), 201


@app.put('/api/productos/<codigo>')
def actualizarProducto(codigo):
    datos = request.get_json() or {}
    
    nombre = datos.get('nombre')
    descripcion = datos.get('descripcion')
    precio = datos.get('precio')
    stock = datos.get('stock', 0)
    imagen_url = datos.get('imagen_url')
    categoria_id = datos.get('categoria_id')
    
    if not nombre or precio is None:
        return jsonify({"error": "Los campos 'nombre' y 'precio' son obligatorios"}), 400

    cursor = db.execute('''
        UPDATE productos 
        SET nombre = ?, 
            descripcion = ?, 
            precio = ?, 
            stock = ?, 
            imagen_url = ?, 
            categoria_id = ?
        WHERE codigo = ?
    ''', (nombre, descripcion, precio, stock, imagen_url, categoria_id, codigo))
    
    db.commit()
    
    if cursor.rowcount == 0:
        return jsonify({"error": f"Producto con código '{codigo}' no encontrado"}), 404
        
    return jsonify({"mensaje": f"Producto '{codigo}' actualizado correctamente"}), 200


@app.delete('/api/productos/<codigo>')
def eliminarProducto(codigo):
    cursor = db.execute('DELETE FROM productos WHERE codigo = ?', (codigo,))
    db.commit()
    
    if cursor.rowcount == 0:
        return jsonify({"error": f"Producto con codigo: {codigo} no encontrado"}), 404
        
    return jsonify({"mensaje": f"Producto con codigo: {codigo} eliminado correctamente"}), 200

@app.get('/api/categorias')
def obtenerCategorias():
    query = "SELECT id_categoria, nombre_categoria FROM categorias"
    rows = db.execute(query).fetchall()
    categorias = [dict(row) for row in rows]
    return jsonify({'ok': True, 'categorias': categorias})


@app.post('/api/categorias/agregar')
def agregarCategorias():
    body = request.get_json() or {}
    nombre_categoria = body.get('nombre_categoria')
    
    if not nombre_categoria: 
        return jsonify({'ok': False, 'error': 'Falta el nombre de la categoría'}), 400
        
    try:
        cursor = db.execute(
            'INSERT INTO categorias (nombre_categoria) VALUES (?)',
            (nombre_categoria,)
        )
        db.commit()
    except Exception as e:
        return jsonify({'ok': False, 'error': 'La categoría ya existe'}), 400
    
    return jsonify({
        'ok': True,
        'mensaje': 'Categoría registrada exitosamente',
        'categoria_id': cursor.lastrowid
    }), 201
