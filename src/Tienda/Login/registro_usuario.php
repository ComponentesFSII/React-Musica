<?php

    include 'conexion.php';

    $nombre_completo = $_POST['nombre_completo'];
    $rut = $_POST['rut'];
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];
    $contrasena_confimarcion = $_POST['contrasenaConf'];
    $telefono = $_POST['telefono'];
    $comuna = $_POST['comuna'];
    $region = $_POST['region'];

    $origen = $_POST['origen'];
    $rol = $_POST['rol'] ?? 'cliente';

    $query = "INSERT INTO usuarios(nombre_completo,rut,correo,contrasena,telefono,region,comuna,rol) 
                VALUES('$nombre_completo','$rut','$correo','$contrasena','$telefono','$region','$comuna','$rol')";

    //verificar que el correo no se repita en la base de datos
    $verificar_correo = mysqli_query($conexion, "SELECT * FROM usuarios WHERE correo='$correo' ");
    if(mysqli_num_rows($verificar_correo) > 0){
        if($origen == "administrador"){
            $pagina = "usuariosAdmi.php";
        }
        else{
            $pagina = "inicioSesion.php";
        }
        echo '
            <script>
                alert("Este correo ya esta registrado");
                window.location = "inicioSesion.php";
            </script>
        ';
        exit;
    }

    //verificar contraseña confimacion
    $verificar_contrasena = ($contrasena == $contrasena_confimarcion);
    if(!$verificar_contrasena){
        if($origen == "administrador"){
            $pagina = "usuariosAdmi.php";
        }
        else{
            $pagina = "inicioSesion.php";
        }
         echo '
            <script>
                alert("Contraseñas no coinciden");
                window.location = "inicioSesion.php";
            </script>
        ';
        exit;
    }

    $ejecutar = $verificar_contrasena && mysqli_query($conexion, $query);

    if($ejecutar){
        if($origen == "administrador"){
            $pagina = "usuariosAdmi.php";
        }
        else{
            $pagina = "inicioSesion.php";
        }
        echo '
            <script> 
                alert("Usuario Registrado");
                window.location = "'.$pagina.'";
            </script>
        ';
    }

    mysqli_close($conexion);
?>