import Logo from '../../assets/LogoPrueba.png';
import { useNavigate } from 'react-router-dom';
import './login.css';

function registro() {
    const navigate = useNavigate();

    const registro = async (e) => {
        e.preventDefault();
        const datos = Object.fromEntries(new FormData(e.target));
        console.log(datos);
        try {
            const response = await fetch('/api/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
        navigate('/login');
    };
    const login = () => {
        navigate('/login');
    }
  return (
    <>
    <div className="contenedor_logo">
        <img src={Logo} alt="logo" />
        <h1>Nombre</h1>
    </div>

    <div className="contenedor">
        <div className="contenedor_registro">
            <form onSubmit={registro}>
                <input defaultValue="inicio" name="origen" type="hidden" />
                <h2>Registrarse</h2>
                <input
                maxLength="100"
                name="nombre_completo"
                placeholder="Nombre Completo"
                type="text"
                />
                <input
                maxLength="9"
                minLength="7"
                name="rut"
                pattern="\d{7,8}[0-9kK]"
                placeholder="RUT 12345678K"
                type="text"
                />
                <input
                maxLength="100"
                name="correo"
                pattern=".+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)"
                placeholder="Correo Electronico"
                type="text"
                />
                <input
                maxLength="10"
                minLength="4"
                name="contrasena"
                placeholder="Contraseña"
                type="password"
                />
                <input
                maxLength="10"
                minLength="4"
                name="contrasenaConf"
                placeholder="Confirmar Contraseña"
                type="password"
                />
                <input name="telefono" placeholder="Telefono" type="text" />
                <div className="region-comuna">
                <select id="region" name="region">
                    <option value="selecciona">Seleccione la Región</option>
                    <option value="metropolitana">Región Metropolitana</option>
                    <option value="aisen">Aisén</option>
                    <option value="antofagasta">Antofagasta</option>
                    <option value="araucanía">Araucanía</option>
                    <option value="arica y parinacota">Arica y Parinacota</option>
                    <option value="atacama">Atacama</option>
                    <option value="biobio">Biobío</option>
                    <option value="coquimbo">Coquimbo</option>
                    <option value="libertador bernardo">
                    Libertador General Bernardo O'Higgins
                    </option>
                    <option value="los lagos">Los Lagos</option>
                    <option value="los rios">Los Ríos</option>
                    <option value="magallanes">Magallanes</option>
                    <option value="maule">Maule</option>
                    <option value="ñuble">Ñuble</option>
                    <option value="tarapaca">Tarapacá</option>
                    <option value="valparaiso">Valparaíso</option>
                </select>
                <input name="comuna" placeholder="Comuna" type="text" />
                </div>
                <button>Registrarse</button>
            </form>

            <div className="caja-login">
                <h4>¿Ya tienes cuenta?</h4>
                <p>Inicia sesion para ingresar a la pagina</p>
            <button type="button" onClick={login}>Iniciar Sesion</button>
            </div>
        </div>
    </div>
    </>
  );
}

export default registro;