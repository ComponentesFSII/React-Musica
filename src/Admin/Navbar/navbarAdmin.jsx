import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link,Outlet, useNavigate } from 'react-router-dom';

function NavbarAdmin() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('usuario');
    
    navigate('/login');
  };

  return (
    <div className="container-fluid flex-grow-1 p-0">
      <div className="row m-0 min-vh-100">

        {/* menu lateral */}
        <div className="col-2 col-sm-3 col-xl-2 bg-dark">

          <Navbar bg="dark" variant="dark" className="border-bottom mb-3">
            <Container fluid>
              <Navbar.Brand as={Link} to="/dashboard">
                IR a tienda
              </Navbar.Brand>
            </Container>
          </Navbar>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/dashboard" className="text-white">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/ordenes" className="text-white">Ordenes</Nav.Link>
            <Nav.Link as={Link} to="/usuarios" className="text-white">Usuarios</Nav.Link>
            <Nav.Link as={Link} to="/productosA" className="text-white">Productos</Nav.Link>
            <Nav.Link as={Link} to="/categoriaA" className="text-white">Categorias</Nav.Link>
            <Nav.Link as={Link} to="/reportes" className="text-white">Reportes</Nav.Link>
            <Nav.Link as={Link} to="/perfil" className="text-white">Perfil</Nav.Link>
            <hr style={{ border: '0', borderTop: '1px solid #ccc', margin: '15px 0' }} />
            <Button 
              as={Link} 
              to="/home" 
              variant="primary" 
              className="w-100 mb-2">
              Tienda
            </Button>

            <Button 
              variant="danger" 
              onClick={logout} 
              className="w-100">
              Cerrar Sesion
            </Button>
          </Nav>

        </div>

        {/* contenido */}
        <div className="col-10 col-sm-9 col-xl-10 p-0 m-0">

          {/* navbar superior */}
          <Navbar bg="dark" variant="dark">
            <Container fluid>
              <Nav className="ms-auto">
                <Nav.Item>
                  <h3 className="text-white mb-0">Nombre pagina</h3>
                  </Nav.Item>
              </Nav>
            </Container>
          </Navbar>

          <div className="p-4">
            {/* Aquí aparecerá el contenido */}
            <Outlet />  

            
          </div>
        
        </div>

      </div>
    </div>
  );
}

export default NavbarAdmin;