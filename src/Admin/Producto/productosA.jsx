import React, { useState, useEffect } from 'react';
import './registroProductos.css';

export default function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [form, setForm] = useState({
    codigo: '',
    nombre: '',
    precio: '',
    imagen: '',
    descripcion: '',
    stock: 0
  });

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const res = await fetch('/api/productos');
        const data = await res.json();
        setProductos(data.productos || []);
      } catch (error) {
        console.error('Error al conectar con el servidor:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codigo: form.codigo,
          nombre: form.nombre,
          precio: parseFloat(form.precio),
          imagen: form.imagen,
          descripcion: form.descripcion,
          stock: parseInt(form.stock) || 0
        }),
      });

      const data = await response.json();
      if (data.ok) {
        alert(data.mensaje);
        const res = await fetch('/api/productos');
        const newData = await res.json();
        setProductos(newData.productos || []);
        
        document.getElementById('cuadro-ingreso-productos').close();
        setForm({ codigo: '', nombre: '', precio: '', imagen: '', descripcion: '', stock: 0 });
      } else {
        alert(data.error || 'Error al registrar producto');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  return (
    <div className="container-fluid flex-grow-1 p-0">
      <div className="row m-0 min-vh-100">
        <div className="col-2 col-sm-3 col-xl-2 bg-dark">
          <div className="p-4">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Código</th>
                  <th scope="col">Producto</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Imagen</th>
                </tr>
              </thead>
              <tbody id="table-products">
                {cargando ? (
                  <tr>
                    <td colSpan="5" className="text-center">Cargando productos...</td>
                  </tr>
                ) : productos.length > 0 ? (
                  productos.map((prod, index) => (
                    <tr key={prod.id_producto || index}>
                      <th scope="row">{index + 1}</th>
                      <td>{prod.codigo}</td>
                      <td>{prod.nombre}</td>
                      <td>${prod.precio}</td>
                      <td>
                        {prod.imagen_url ? (
                          <img src={prod.imagen_url} alt={prod.nombre} width="50" height="50" style={{objectFit: 'cover'}} />
                        ) : (
                          'Sin imagen'
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No hay productos registrados</td>
                  </tr>
                )}
              </tbody>
            </table>

            <button 
              className="btn btn-success" 
              id="ventana-ingreso-productos"
              onClick={() => document.getElementById('cuadro-ingreso-productos').showModal()}
            >
              Agregar producto
            </button>

            <dialog id="cuadro-ingreso-productos">
              <form className="cuadro-registro" id="forma-ingreso-productos" onSubmit={handleSubmit}>
                <h3>INGRESO DE PRODUCTOS</h3>
                
                <label htmlFor="codigo">Código: </label>
                <input type="text" id="codigo" value={form.codigo} onChange={handleChange} required />

                <label htmlFor="nombre">Nombre: </label>
                <input type="text" id="nombre" value={form.nombre} onChange={handleChange} required />
                
                <label htmlFor="precio">Precio: </label>
                <input type="number" id="precio" value={form.precio} onChange={handleChange} required />
                
                <label htmlFor="imagen">Imagen (URL): </label>
                <input type="text" id="imagen" value={form.imagen} onChange={handleChange} />

                <div style={{ marginTop: '50px' }}>
                  <button type="submit" className="btn btn-info">Agregar</button>
                  <button 
                    type="button" 
                    className="btn btn-danger" 
                    id="btn-cerrar-cuadro"
                    onClick={() => document.getElementById('cuadro-ingreso-productos').close()}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
}