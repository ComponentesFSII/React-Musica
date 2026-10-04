import React from 'react';
import './footer.css'; // Importa aquí tu archivo de estilos

function Footer() {
  return (
    <footer className="site-footer">
      <p>© 2026 Mi Empresa. Todos los derechos reservados.</p>
      <ul className="footer-links">
        <li><a href="#privacy">Privacidad</a></li>
        <li><a href="#terms">Términos</a></li>
      </ul>
    </footer>
  );
}

export default Footer;