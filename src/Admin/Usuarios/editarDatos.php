<!--ventana de editar usuario del boton que sale en usuariosAdmi-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    
    <link rel="stylesheet" href="../css/registroAdmin.css">
    <link rel="stylesheet" href="../css/estilo.css">

    <title>Editar Usuario</title>
</head>
<body>
    <div class="container-fluid">
        <div class="row" style="height: 150vh;">
            <div class="col-2 col-sm-3 col-xl-2 bg-dark">
                <!--menu lateral-->
                <nav class="navbar bg-dark border-bottom border-body mb-3" data-bs-theme="dark">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">
                            <img src="../img/Logo_de_empresa_2.png" alt="Logo" width="150" height="90">
                        </a>
                        
                    </div>
                </nav>

                <nav class="nav flex-column">
                    <a class="nav-link link-secondary text-decoration-none text-white" href="#">Home</a>
                    <a class="nav-link active link-secondary text-decoration-none text-white" href="usuariosAdmi.php">Usuarios</a>
                    <a class="nav-link link-secondary text-decoration-none text-white" href="../html/productosAdmin.html">Productos</a>
                    <a class="nav-link link-secondary text-decoration-none text-white" href="../html/index.html">Pagina Tienda</a>
                    <a class="nav-link link-secondary text-decoration-none text-white"  href="cerrarSesion.php">Cerrar Sesion</a>
                </nav>

            </div>
            <div class="col-10 col-sm-9 col-xl-10 p-0 m-0">
                <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                    <div class="container-fluid">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <h3 style="color: #ffffff">Fronentes</h3>
                            </li>
                        </ul>
                    </div>
                </nav>

                <!--contenido de la pagina-->
                <?php
                include("../php/conexion.php");

                if (!isset($_GET['id'])) {
                    header("Location: usuariosAdmi.php");
                    exit();
                }

                $id_get = $_GET['id'];

                $consulta = "SELECT * FROM usuarios WHERE id = '$id_get'";
                $resultado = mysqli_query($conexion, $consulta);

                if ($row = mysqli_fetch_assoc($resultado)) {
                    $id = $row['id'];
                    $nombre_completo = $row['nombre_completo'];
                    $rut = $row['rut'];
                    $correo = $row['correo'];
                    $telefono = $row['telefono'];
                    $comuna = $row['comuna'];
                    $region = $row['region'];
                    $rol = $row['rol'];
                }
                ?>
                <div class="container text-center">
                    <!--formulario de registro-->
                    <div class="contenedor_formulario">
                        <form action="actualizarDatos.php" method="POST" class="formulario_editar">
                            <input type="hidden" name="id" value="<?php echo $id;?>">
                            <input type="hidden" name="origen" value="administrador">
                            <h2 style="color: #ffffff">Editar Usuario</h2>
                            <div class="mb-3">
                                <label for="nombre" class="form-label">Nombre Completo</label>
                                <input type="text"  class="form-control" maxlength="100" placeholder="Nombre Completo" name="nombre_completo" value="<?php echo htmlspecialchars($nombre_completo); ?>">
                            </div>
                            <div class="mb-3">
                                <label for="rut" class="form-label">RUT</label>
                                <input type="text"  class="form-control" minlength="7" maxlength="9" pattern="\d{7,8}[0-9kK]" placeholder="RUT 12345678K" name="rut" value="<?php echo htmlspecialchars($rut); ?>">
                            </div>
                            <div class="mb-3">
                                <label for="correo" class="form-label">Correo</label>
                                <input type="text" class="form-control" maxlength="100" pattern=".+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)" placeholder="Correo Electronico" name="correo" value="<?php echo htmlspecialchars($correo); ?>">
                            </div>
                            <div class="mb-3">
                                <label for="telefono" class="form-label">Telefono</label>
                                <input type="text" class="form-control" placeholder="Telefono" name="telefono" value="<?php echo htmlspecialchars($telefono); ?>">
                            </div>
                             <div class="mb-3">
                                <label for="rol" class="form-label">Rol</label>
                                <select name="rol" id="rol" class="form-control">
                                    <option value="cliente" <?php if($rol == "cliente") echo "selected"; ?>>Cliente</option>
                                    <option value="admin" <?php if($rol == "admin") echo "selected"; ?>>Admin</option>
                                </select>
                            </div>
                            <!--selector de region y comuna-->
                            <div class="region-comuna">
                                <select name="region" id="region">
                                    <option value="selecciona">Seleccione la Región</option>
                                    <option value="metropolitana" <?php if($region == "metropolitana") echo "selected"; ?>>Región Metropolitana</option>
                                    <option value="aisen"<?php if($region == "aisen") echo "selected"; ?>>Aisén</option>
                                    <option value="antofagasta" <?php if($region == "antofagasta") echo "selected"; ?>>Antofagasta</option>
                                    <option value="araucania"<?php if($region == "araucania") echo "selected"; ?>>Araucanía</option>
                                    <option value="arica y parinacota" <?php if($region == "arica y parinacota") echo "selected"; ?>>Arica y Parinacota</option>
                                    <option value="atacama" <?php if($region == "atacama") echo "selected"; ?>>Atacama</option>
                                    <option value="biobio" <?php if($region == "biobio") echo "selected"; ?>>Biobío</option>
                                    <option value="coquimbo" <?php if($region == "coquimbo") echo "selected"; ?>>Coquimbo</option>
                                    <option value="libertador bernardo" <?php if($region == "libertador bernardo") echo "selected"; ?>>Libertador General Bernardo O'Higgins</option>
                                    <option value="los lagos" <?php if($region == "los lagos") echo "selected"; ?>>Los Lagos</option>
                                    <option value="los rios" <?php if($region == "los rios") echo "selected"; ?>>Los Ríos</option>
                                    <option value="magallanes" <?php if($region == "magallanes") echo "selected"; ?>>Magallanes</option>
                                    <option value="maule" <?php if($region == "maule") echo "selected"; ?>>Maule</option>
                                    <option value="ñuble" <?php if($region == "ñuble") echo "selected"; ?>>Ñuble</option>
                                    <option value="tarapaca" <?php if($region == "tarapaca") echo "selected"; ?>>Tarapacá</option>
                                    <option value="valparaiso" <?php if($region == "valparaiso") echo "selected"; ?>>Valparaíso</option>
                                </select>
                                <input type="text" placeholder="Comuna" name="comuna" value="<?php echo htmlspecialchars($comuna); ?>">
                            </div>
                           
                        <div class="d-grid gap-2 d-md-block" style="margin-top: 40px;">
                            <button type="submit" class="btn btn-primary">Actualizar</button>
                            <a href="usuariosAdmi.php" class="btn btn-danger">Cancelar</a>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <footer class="mt-auto py-5 text-center"  style="background-color: #000000">
        <div class="container">
            <h4 class="mb-3" style="color: #ffffff">
            <img src="../img/Logo_de_empresa_2.png" alt="Logo" width="90" height="55" class="d-inline-block align-middle">
            Fronentes
            </h4>
            <ul class="list-inline mb-4">
                <li class="list-inline-item mx-3"><a class="link-secondary text-decoration-none text-white" href="../html/index.html">Home</a></li>
                <li class="list-inline-item mx-3"><a class="link-secondary text-decoration-none text-white" href="../html/productos.html">Productos</a></li>
                <li class="list-inline-item mx-3"><a class="link-secondary text-decoration-none text-white" href="..html/nosotros.html">Nosotros</a></li>
                <li class="list-inline-item mx-3"><a class="link-secondary text-decoration-none text-white" href="../html/blog.html">Blog</a></li>
                <li class="list-inline-item mx-3"><a class="link-secondary text-decoration-none text-white" href="usuariosAdmi.php">Admi</a></li>
                <li class="list-inline-item mx-3"><a class="link-secondary text-decoration-none text-white" href="..html/contacto.html">Contacto</a></li>
            </ul>
            <span class="small text-white">&copy; 2026 Fronentes</span>
        </div>
    </footer>
</body>


</html>