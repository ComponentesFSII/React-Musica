import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { BsCart, BsBoxSeam, BsFillPeopleFill } from "react-icons/bs";
import { BsClipboard2Data,BsPersonCircle,BsBarChart,BsTags,BsBasket2 } from "react-icons/bs";

function Dashboard() {
  const [totalUsuarios, setTotalUsuarios] = useState(0);

  //valores estaticos para las otras metricas
  const totalCompras = 0;
  const totalProductos = 0;

  useEffect(() => {
    fetch('/api/usuarios/count')
      .then((response) => response.json())
      .then((data) => {
        if(data.ok){
          setTotalUsuarios(data.total);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
      });
  }, []);

const cardsData = [
    {
      id: 'compras',
      title: 'Total Compras',
      value: totalCompras,
      bg: 'primary',
      icon: <BsCart size={30} className="mb-2" />,
      text: 'Total de compras realizadas.'
    },
    {
      id: 'productos',
      title: 'Total Productos',
      value: totalProductos,
      bg: 'success',
      icon: <BsBoxSeam size={30} className="mb-2" />,
      text: 'Cantidad de productos disponibles.'
    },
    {
      id: 'usuarios',
      title: 'Total Usuarios',
      value: totalUsuarios,
      bg: 'warning',
      icon: <BsFillPeopleFill size={30} className="mb-2" />,
      text: 'Usuarios registrados actualmente.'
    }
  ];

const dataCardLink= [
  {id: 'dashboard',
  title: 'Dashaboard',
  Link: '/dashboard',
  icon: <BsClipboard2Data size={30} className='mb-2 text-primary mx-auto block'/>,
  text: 'Vision general de todas las metricas y estadisticas claves del sistema.'
  },
  {id: 'ordenes',
  title: 'Ordenes',
  Link: '/ordenes',
  icon: <BsCart size={30} className='mb-2 text-primary mx-auto block'/>,
  text: 'Gestion y seguimiento de todas las ordenes de compra realizadas.'
  },
  {id: 'productos',
  title: 'Productos',
  Link: '/productosA',
  icon: <BsBoxSeam size={30} className='mb-2 text-primary mx-auto block'/>,
  text: 'Administracion de inventario y detalle de productos disponibles'
  },
  {id: 'categoria',
  title: 'Categoria',
  Link: '/categoriaA',
  icon: <BsTags size={30} className='mb-2 text-primary mx-auto block'/>,
  text: 'Organizacion de productos en categorias para facilitar su navegacion.'
  },
  {id: 'usuarios',
  title: 'Usuarios',
  Link: '/usuarios',
  icon: <BsFillPeopleFill size={30} className='mb-2 text-primary mx-auto block'/>,
  text: 'Gestion de cuentas de usuarios y roles dentro del sistema.'
  },
  {id: 'reportes',
  title: 'Reportes',
  Link: '/reportes',
  icon: <BsBarChart size={30} className='mb-2 text-primary mx-auto block'/>,
  text: 'Generacion de informes detallados sobre las operaciones del sistema.'
  },
  {id: 'perfil',
  title: 'Perfil',
  Link: '/perfil',
  icon: <BsPersonCircle size={30} className='mb-2 text-primary mx-auto block'/>,
  text: 'Administracion de la informacion personal y configuracion de la cuenta.'
  },
  {id: 'tienda',
  title: 'tienda',
  Link: '/home',
  icon: <BsBasket2 size={30} className='mb-2 text-primary mx-auto block'/>,
  text: 'Visualizacion de la tienda en tiempo real.'
  }
];

  return (
    <>
    <div>
      <h1>Dashboard</h1>
    </div>
    {/*tarjetas de metricas */}
    <Row xs={1} md={3} className="g-4">
      {cardsData.map((item) => (
        <Col key={item.id}>
          <Card bg={item.bg} className="h-100 text-center p-3 shadow-sm">
            <Card.Body>
              <Card.Title className="text-white"> {item.icon} {item.title}</Card.Title>
              <h2 className="text-white">{item.value}</h2>
              <Card.Text className="text-white">
                {item.text}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    
  
    {/*tarjetas link*/}
    <Row xs={1} md={4} className="g-4 mt-3">
      {dataCardLink.map((item) => (
        <Col key={item.id}>
          <Link to={item.Link} className="text-decoration-none text-dark">
            <Card className="h-100 text-center p-3 shadow-sm h-100 hover-shadow transition">
              {item.icon} 
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text className="text-muted">
                  {item.text}
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
    </>
  );
}

export default Dashboard;