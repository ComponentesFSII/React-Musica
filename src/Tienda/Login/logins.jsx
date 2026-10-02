import { useNavigate } from 'react-router-dom';

function logins() {

  const navigate = useNavigate();

  const iniciarSesion = () => {
    navigate('/dashboard');
  };

  return (
    
      <button
        className="btn btn-primary"
        onClick={iniciarSesion}
      >
        Iniciar sesión
      </button>

  );
}

export default logins;