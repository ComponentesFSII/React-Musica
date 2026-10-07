import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/LogoPrueba.png';
import './footer.css';

function Footer() {
  return (
    <footer className="footer_contenedor text-center">
      <div className="container">
        <h4 className="footer_letras">
          <img alt="logo" src={Logo} className='footer_logo'/>
          Nombre
        </h4>

        <ul className="list-inline mb-4">
          <li className="list-inline-item mx-3">
            <Link className="footer_link text-decoration-none" to="/home">
              Home
            </Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link className="footer_link text-decoration-none" to="/productos">
              Productos
            </Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link className="footer_link text-decoration-none" to="/ofertas">
              Ofertas
            </Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link className="footer_link text-decoration-none" to="/nosotros">
              Nosotros
            </Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link className="footer_link text-decoration-none" to="/blog">
              Blog
            </Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link className="footer_link text-decoration-none" to="/contacto">
              Contacto
            </Link>
          </li>
          <li className="list-inline-item mx-3">
            <Link className="footer_link text-decoration-none" to="/dashboard">
              Admin
            </Link>
          </li>
        </ul>

        <span className="small">
          © 2026 Nombre. Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
}

export default Footer;