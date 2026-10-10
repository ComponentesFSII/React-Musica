import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CarritoContext } from '../Carrito/Carrito';
import './productos.css';

export default function DetalleProductos() {
  const { codigo } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const { agregarProducto } = useContext(CarritoContext);

  useEffect(() => {
    const endpoint = codigo ? `/api/productos/${codigo}` : '/api/productos';

    fetch(endpoint)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('Error en la petición a la API');
        }
        return respuesta.json();
      })
      .then((data) => {
        if (data.ok) {
          if (data.producto) {
            setProducto(data.producto);
          } else if (data.productos && data.productos.length > 0) {
            setProducto(data.productos[0]);
          }
        } else {
          setError('No se pudo encontrar el producto');
        }
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, [codigo]);

  if (cargando) return <div className="text-center p-5">Cargando producto...</div>;
  if (error || !producto) return <div className="text-center p-5">{error || 'Producto no encontrado.'}</div>;

  const porcentajeIVA = 0.19;
  const montoIVA = producto.precio * porcentajeIVA;
  const precioNeto = producto.precio - montoIVA;
  const precioTotal = producto.precio;

  const formatearPrecio = (valor) => {
    return valor ? new Intl.NumberFormat('es-CL').format(valor) : '0';
  };

  const agregarClick = () => {
    agregarProducto({
      id: producto.id_producto || producto.codigo,
      nombre: producto.nombre,
      precio: producto.precio || 0,
      imagen: producto.imagen_url
    });
  };

  return (
    <main className="container my-4">
      <div className="container-presentacion row mb-4">
        <div className="card-productos col-md-6 text-center">
          <h1>{producto.nombre}</h1>
          <img 
            src={producto.imagen_url} 
            className="card-productos-img img-fluid" 
            alt={producto.nombre || "producto-detalle"} 
          />
        </div>

        <div className="card-precios col-md-6 d-flex flex-column justify-content-center">
          <div className="card-precios-detalles mb-3">
            <p className="mb-1">
              Precio neto: $<span id="precioProducto">{formatearPrecio(precioNeto)}</span>
            </p>
            <p className="mb-1">
              IVA (19%): $<span id="precioIVA">{formatearPrecio(montoIVA)}</span>
            </p>
            <p className="h5 fw-bold text-success">
              Precio TOTAL: $<span id="precioTotal">{formatearPrecio(precioTotal)}</span>
            </p>
          </div>

          <button type="button" className="btn btn-info btn-lg btn-carrito text-white" onClick={agregarClick}>
            Agregar al carrito
          </button>
        </div>
      </div> 

      <div className="accordion" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
              Descripción del producto
            </button>
          </h2>
          <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne">
            <div className="accordion-body">
              {producto.descripcion || 'Sin descripción disponible.'}
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
              Información del vinilo
            </button>
          </h2>
          <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo">
            <div className="accordion-body">
              <p><strong>Código:</strong> {producto.codigo}</p>
              <p><strong>Categoría / Género:</strong> {producto.categoria_nombre || 'General'}</p>
              <p><strong>Unidades disponibles:</strong> {producto.stock}</p>
            </div>
          </div>
        </div>
      </div> 
    </main>
  );
}