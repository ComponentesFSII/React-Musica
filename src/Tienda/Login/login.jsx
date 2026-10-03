import './login.css';
import Logo from '../../assets/LogoPrueba.png';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setcontrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(correo === '' || contrasena === '') {
      setError(true);
      return;
    }
    setError(false);
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, contrasena }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error('Error:', error));
    navigate('/dashboard');

  }

  const registro = () => {
    navigate('/registro');
  }

  return (
    <>
    <div className="contenedor_logo">
      <img src={Logo} alt="logo" />
      <h1>Nombre</h1>
    </div>

    <div className="contenedor">
      <div className="contenedor_login">
        <form onSubmit={handleSubmit}>
          <h2>Iniciar Sesion</h2>
          <input
            maxLength="100"
            name="correo"
            pattern=".+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)"
            placeholder="Correo Electronico"
            type="text"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <input
            maxLength="10"
            minLength="4"
            name="contrasena"
            placeholder="Contraseña"
            type="password"
            value={contrasena}
            onChange={(e) => setcontrasena(e.target.value)}
          />
          <button>Iniciar Sesion</button>
        </form>

        
        
        <div className="caja-registro">
          {error && <p className="error">Todos los campos son obligatorios</p>}
          <h4>¿Aun no tienes cuenta?</h4>
          <p>Registrate para iniciar sesion</p>
          <button type="button" onClick={registro}>Registrarse</button>
        </div>
        
      </div>
    </div>
    </>
  );
}

export default Login;