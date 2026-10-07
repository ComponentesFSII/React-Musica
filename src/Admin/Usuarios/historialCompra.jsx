import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

// Datos de compras simulados
const comprasFicticias = [
  {
    id: 101,
    fecha: "2024-03-15",
    estado: "Completado",
    total: 45990,
    items: [
      { nombre: "Audífonos Bluetooth", cantidad: 1, precio: 29990 },
      { nombre: "Cargador Carga Rápida", cantidad: 1, precio: 16000 }
    ]
  },
  {
    id: 102,
    fecha: "2024-03-28",
    estado: "Pendiente",
    total: 12990,
    items: [
      { nombre: "Funda para Smartphone", cantidad: 1, precio: 12990 }
    ]
  },
  {
    id: 103,
    fecha: "2024-04-02",
    estado: "Cancelado",
    total: 89990,
    items: [
      { nombre: "Teclado Mecánico RGB", cantidad: 1, precio: 89990 }
    ]
  }
];

function HistorialCompra() {
  const { id } = useParams();
  const [compras, setCompras] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const responseUsuario = await fetch(`/api/usuarios/${id}`);
        const dataUsuario = await responseUsuario.json();

        if (dataUsuario.ok) {
          setUsuario(dataUsuario.usuario);
        } else {
          setUsuario(dataUsuario.usuario || dataUsuario);
        }

        setCompras(comprasFicticias);

      } catch (err) {
        console.error("Error al cargar la informacion:", err);
        setError("Error al obtener los datos del usuario");
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, [id]);


  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          Historial de Compras
          {usuario?.nombre_completo ? ` - ${usuario.nombre_completo}` : ""}
        </h2>
        <Link to="/usuarios" className="btn btn-outline-primary">
          Volver a Usuarios
        </Link>
      </div>


      {/* Tabla con el historial de compras*/}
      {!error && compras.length === 0 ? (
        <div className="alert alert-info text-center">
          El usuario no ha realizado compras.
        </div>
      ) : (
        <Table className="table table-bordered border-primary tabla_gris">
          <thead className="table-dark text-center">
            <tr>
              <th>ID Compra</th>
              <th>Fecha</th>
              <th>Productos</th>
              <th>Estado</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra) => (
              <tr key={compra.id}>
                <td className="text-center fw-bold">#{compra.id}</td>
                <td className="text-center">
                  {new Date(compra.fecha).toLocaleDateString("es-CL")}
                </td>
                <td>
                  <ul className="list-unstyled mb-0">
                    {compra.items?.map((item, index) => (
                      <li key={index}>
                        • {item.nombre} x{item.cantidad} (${item.precio.toLocaleString("es-CL")})
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="text-center">
                  <Badge
                    bg={
                      compra.estado === "Completado"
                        ? "success"
                        : compra.estado === "Pendiente"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {compra.estado}
                  </Badge>
                </td>
                <td className="text-end fw-bold">
                  ${compra.total.toLocaleString("es-CL")}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default HistorialCompra;