import { Link, Outlet } from 'react-router-dom';
import { BsCart2, BsPersonCircle  } from "react-icons/bs";
import Logo from '../../assets/logo.png';
import './navbar.css';

function NavigationBar() {
  return (
    <>
      <nav className="navbar">

        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <img src={Logo} alt="Offbeat" />
          </Link>

          <div className="navbar-links">
            <Link to="/home">Home</Link>
            <Link to="/producto">Productos</Link>
            <Link to="/ofertas">Ofertas</Link>
            <Link to="/nosotros">Nosotros</Link>
            <Link to="/blogs">Blog</Link>
            <Link to="/contacto">Contacto</Link>
          </div>
        </div>

        <div className="navbar-actions">
          <Link
            to="/login"
            className="user-button"
            aria-label="Iniciar sesión"
            title="Iniciar sesión"
          >
            <BsPersonCircle size={21}/>
          </Link>

          <Link to="/carrito" className="cart-button">
            <BsCart2 size={19}/>
            <span>Carrito</span>
          </Link>
        </div>

      </nav>
      <Outlet />  
    </>
  );
}

export default NavigationBar;