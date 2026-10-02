import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link,Outlet } from 'react-router-dom';

function NavigationBar() {
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
        <Navbar.Brand as={Link} to="/home" className="ms-4">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/Productos">Productos</Nav.Link>
            <Nav.Link as={Link} to="/Nosotros">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/Blog">Blog</Nav.Link>
            <Nav.Link as={Link} to="/Contacto">Contacto</Nav.Link>
            <Nav.Link as={Link} to="/Categorias">Categoria</Nav.Link>
            <Nav.Link as={Link} to="/Comprar">Comprar</Nav.Link>
            <Nav.Link as={Link} to="/Ofertas">Ofertas</Nav.Link>
          </Nav>

          <Nav className="ms-auto me-4">
            <Nav.Link as={Link} to="/Login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    <Outlet/>
    </>
  );
}

export default NavigationBar;