import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CarritoContext } from '../Carrito/Carrito';

export default function categorias() {
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
  return (
    <div>
      <h1>Categoria</h1>
    </div>
  );
}