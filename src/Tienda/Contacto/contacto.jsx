import Logo from '../../assets/LogoPrueba.png';
import './contacto.css'

import { useState } from 'react'; 

function Contacto() {
  const [datos, setDatos] = useState({
    correo: '',
    nombre_completo: '',
    comentario: ''
  });

  const [mensaje, setMensaje] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
 
    try {
      const response = await fetch('/api/comentario', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(datos)
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setMensaje(data.mensaje || 'Comentario enviado con exito');
        setDatos({ correo: '', nombre_completo: '', comentario: '' });
      } 
      else {
        setMensaje(data.error || 'Ocurrio un error al enviar el mensaje');
      }
    } 
    catch (error) {
      setMensaje('Error el mensaje no pude ser enviado');
    }
  };

  return (
    <>
    <div className="contenedor_logo">
      <img src={Logo} alt="logo" />
      <h1>Nombre</h1>
      <h4>¿Necesitas ayuda? Contactanos</h4>
    </div>
    
    <div className='contenedor'>
      <div className="contenedor_formulario_contacto">
        <h2>Envianos tus comentarios</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="correo">Correo</label>
          <input
            className="form-control"
            maxLength="100"
            name="correo"
            pattern=".+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)"
            placeholder="Correo Electronico"
            type="text"
            required
            value={datos.correo}
            onChange={handleChange}
          />
            
          <label htmlFor="nombre">Nombre Completo</label>
          <input
            className="form-control"
            maxLength="100"
            name="nombre_completo"
            placeholder="Nombre Completo"
            type="text"
            required
            value={datos.nombre_completo}
            onChange={handleChange}
          />
          <label htmlFor="comentario">Comentario</label>
          <textarea
            className="form-control"
            maxLength="500"
            name="comentario"
            placeholder="Contenido"
            required
            rows="4"
            value={datos.comentario}
            onChange={handleChange}
          />
          <button className="btn btn-primary" type="submit">
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>

  </> 
  );
}   

export default Contacto;