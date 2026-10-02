<?php
    session_start();
    if(isset($_SESSION['usuario'])){
        if(isset($_SESSION['rol']) && $_SESSION['rol'] === 'admin'){
            header("location: usuariosAdmi.php");
        }
        else{
            header("location: ../html/index.html");
        }
        exit;
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../css/login.css">
    <link rel="stylesheet" href="../css/estilo.css">
    <title>Inicio Sesion</title>
</head>
<body>

    <nav class="navbar navbar-expand-lg navbar-dark navbar-custom">
    <div class="container-fluid">
        <a class="navbar-brand d-flex align-items-center gap-2" href="index.html">
        <img src="../img/Logo_de_empresa_2.png" alt="Logo" width="90" height="55" class="d-inline-block align-middle">  
        </a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center">
            <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="../html/index.html">Home</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" aria-current="page" href="../html/productos.html">Productos</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" aria-current="page" href="../html/nosotros.html">Nosotros</a>
            </li>
            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Inicio Sesión
            </a>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="inicioSesion.php">Iniciar Sesión</a></li>
                <li><a class="dropdown-item" href="cerrarSesion.php">Cerrar Sesión</a></li>
            </ul>
            <li class="nav-item">
            <a class="nav-link" aria-current="page" href="../html/blog.html">Blogs</a>
            </li>
    
            <li class="nav-item">
            <a class="nav-link" aria-current="page" href="../html/contacto.html">Contactos</a>
            </li>
    
        </ul>
        </div>
        <a href="#" class="d-flex align-items-center gap-2 cart-link">
        <i class="bi bi-cart-fill fs-5"></i>
        <span>Carrito (0)</span>
        </a>
    </div>
    </nav>
 
    <div class="contenedor_logo">
        <img src="../img/Logo_de_empresa_2.png" alt="logo" height="150px">
        <h1 style="color: white;">FRONENTES</h1>
    </div>

    <main>
        <div class="contenedor">

            <div class="caja_trasera">
                <div class="caja_trasera-login">
                    <h3>¿Ya tienes cuenta?</h3>
                    <p>Inicia sesion para ingresar a la pagina</p>
                    <button id="btn_iniciar-sesion">Iniciar Sesion</button>
                </div>
                <div class="caja_trasera-registro">
                    <h3>¿Aun no tienes cuenta?</h3>
                    <p>Registrate para iniciar sesion</p>
                    <button id="btn_registrarse">Registrarse</button>
                </div>
            </div>

            <div class="contenedor_login-registro">
                <!--formulario login-->
                <form action="login_usuario.php" method="POST" class="formulario_login">
                    <h2>Iniciar Sesion</h2>
                    <input type="text" maxlength="100" pattern=".+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)" placeholder="Correo Electronico" name="correo">
                    <input type="password" minlength="4" maxlength="10" placeholder="Contraseña" name="contrasena">
                    <button>Iniciar Sesion</button>
                </form>
                <!--formulario de registro-->
                <form action="registro_usuario.php" method="POST" class="formulario_registro">
                    <input type="hidden" name="origen" value="inicio">
                    <h2>Registrarse</h2>
                    <input type="text" maxlength="100" placeholder="Nombre Completo" name="nombre_completo">
                    <input type="text" minlength="7" maxlength="9" pattern="\d{7,8}[0-9kK]"  placeholder="RUT 12345678K" name="rut">
                    <input type="text" maxlength="100" pattern=".+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)" placeholder="Correo Electronico" name="correo">
                    <input type="password" minlength="4" maxlength="10" placeholder="Contraseña" name="contrasena">
                    <input type="password" minlength="4" maxlength="10" placeholder="Confirmar Contraseña" name="contrasenaConf">
                    <input type="text" placeholder="Telefono" name="telefono">
                    <!--selector de region y comuna-->
                    <div class="region-comuna">
                        <select name="region" id="region">
                            <option value="selecciona">Seleccione la Región</option>
                            <option value="metropolitana">Región Metropolitana</option>
                            <option value="aisen">Aisén</option>
                            <option value="antofagasta">Antofagasta</option>
                            <option value="araucanía">Araucanía</option>
                            <option value="arica y parinacota">Arica y Parinacota</option>
                            <option value="atacama">Atacama</option>
                            <option value="biobio">Biobío</option>
                            <option value="coquimbo">Coquimbo</option>
                            <option value="libertador bernardo">Libertador General Bernardo O'Higgins</option>
                            <option value="los lagos">Los Lagos</option>
                            <option value="los rios">Los Ríos</option>
                            <option value="magallanes">Magallanes</option>
                            <option value="maule">Maule</option>
                            <option value="ñuble">Ñuble</option>
                            <option value="tarapaca">Tarapacá</option>
                            <option value="valparaiso">Valparaíso</option>
                        </select>
                        <input type="text" placeholder="Comuna" name="comuna">
                    </div>
                    
                    <button>Registrarse</button>
                </form>
            </div>

        </div>
    </main>
    <script src="../js/login.js"></script>

    <footer class="mt-auto py-5 text-center"  style="background-color: #000000">
        <div class="container">
            <h4 class="mb-3" style="color: #ffffff">
            <img src="../img/Logo_de_empresa_2.png" alt="Logo" width="90" height="55" class="d-inline-block align-middle">
            Fronentes
            </h4>
            <ul class="list-inline mb-4">
                <li class="list-inline-item mx-3"><a class="link-secondary text-decoration-none text-white" href="../html/index.html">Home</a></li>
                <li class="list-inline-item mx-3"><a class="link-secondary text-decoration-none text-white" href="../html/productos.html">Productos</a></li>
                <li class="list-inline-item mx-3"><a class="link-secondary text-decoration-none text-white" href="../html/nosotros.html">Nosotros</a></li>
                <li class="list-inline-item mx-3"><a class="link-secondary text-decoration-none text-white" href="../html/blog.html">Blog</a></li>
                <li class="list-inline-item mx-3"><a class="link-secondary text-decoration-none text-white" href="usuariosAdmi.php">Admi</a></li>
                <li class="list-inline-item mx-3"><a class="link-secondary text-decoration-none text-white" href="../html/contacto.html">Contacto</a></li>
            </ul>
            <span class="small text-white">&copy; 2026 Fronentes</span>
        </div>
    </footer>
</body>

</html>