import React from 'react';
import {
  BrowserRouter,Routes,Route,Navigate,useLocation} from 'react-router-dom';

import NavigationBar from './Tienda/Navbar/navbar';

import Home from './Tienda/Home/home';
import Productos from './Tienda/Productos/producto';
import Nosotros from './Tienda/Nosotros/nosotros';
import Blog from './Tienda/Blog/blogs';
import Contacto from './Tienda/Contacto/contacto';
import Categorias from './Tienda/Categorias/categorias';
import Comprar from './Tienda/Comprar/compras';
import Ofertas from './Tienda/Ofertas/ofertas';
import Login from './Tienda/Login/login';
import Registro from './Tienda/Login/registro';

import NavbarAdmin from './Admin/Navbar/navbarAdmin';

import Perfil from './Admin/Perfil/perfil';
import Usuarios from './Admin/Usuarios/usuarios';
import ProductosAdmin from './Admin/Producto/productosA';
import CategoriasAdmin from './Admin/Categoria/categoriaA';
import Dashboard from './Admin/Dashboard/dashboard';
import Reporte from './Admin/Reportes/reportes';
import EditarUsuario from './Admin/Usuarios/editarUsuario';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* TIENDA */}
        <Route element={<NavigationBar />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Productos" element={<Productos />} />
          <Route path="/Nosotros" element={<Nosotros />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Contacto" element={<Contacto />} />
          <Route path="/Categorias" element={<Categorias />} />
          <Route path="/Comprar" element={<Comprar />} />
          <Route path="/Ofertas" element={<Ofertas />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Registro" element={<Registro />} />
        </Route>

        {/* ADMIN */}
        <Route element={<NavbarAdmin />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/editarUsuario/:id" element={<EditarUsuario />} />
          <Route path="/productosA" element={<ProductosAdmin />} />
          <Route path="/categoriaA" element={<CategoriasAdmin />} />
          <Route path="/reportes" element={<Reporte />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
export default App;