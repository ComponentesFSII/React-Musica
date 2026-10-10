import os
import sqlite3

def poblar_base_datos():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(base_dir, '..', 'db', 'datos.db')
    
    db = sqlite3.connect(db_path)
    cursor = db.cursor()

    generos = [
        ('Grunge',),
        ('Alternativo',),
        ('Rock',),
        ('Indie',),
        ('Glam Rock',),
        ('Soul',)
    ]
    
    cursor.executemany(
        'INSERT OR IGNORE INTO categorias (nombre_categoria) VALUES (?)', 
        generos
    )
    db.commit()

    # Mapear los IDs de cada categoría
    cursor.execute('SELECT id_categoria, nombre_categoria FROM categorias')
    cat_map = {nombre: id_cat for id_cat, nombre in cursor.fetchall()}

    # 2. Insertar Vinilos
    vinilos = [
        ('VIN-001', 'Nevermind - Nirvana', 'Álbum clásico del género Grunge.', 32990, 10, '/vinilos/nevermind.jpg', cat_map.get('Grunge')),
        ('VIN-002', 'OK Computer - Radiohead', 'Álbum icónico de rock alternativo.', 34990, 8, '/vinilos/ok-computer.jpg', cat_map.get('Alternativo')),
        ('VIN-003', 'Rumours - Fleetwood Mac', 'Obra maestra del rock.', 32990, 12, '/vinilos/rumours.jpg', cat_map.get('Rock')),
        ('VIN-004', 'The Queen Is Dead - The Smiths', 'Clásico del indie rock.', 29990, 5, '/vinilos/the-queen-is-dead.jpg', cat_map.get('Indie')),
        ('VIN-005', 'Ziggy Stardust - David Bowie', 'Álbum conceptual de Glam Rock.', 32990, 7, '/vinilos/ziggy-stardust.jpg', cat_map.get('Glam Rock')),
        ('VIN-006', 'Back to Black - Amy Winehouse', 'Álbum referente del Soul moderno.', 28990, 15, '/vinilos/back-to-black.jpg', cat_map.get('Soul'))
    ]

    cursor.executemany('''
        INSERT OR IGNORE INTO productos (codigo, nombre, descripcion, precio, stock, imagen_url, categoria_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', vinilos)
    
    db.commit()
    db.close()
    print("¡Base de datos de vinilos poblada con éxito!")

if __name__ == '__main__':
    poblar_base_datos()