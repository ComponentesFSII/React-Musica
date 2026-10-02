<!--inicio sesion usuario-->
<?php

    session_start();
    include 'conexion.php';

    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];

    $validar_login = mysqli_query($conexion, "SELECT * FROM usuarios WHERE correo='$correo' and  contrasena='$contrasena' ");

    if(mysqli_num_rows($validar_login) > 0){
        $fila = mysqli_fetch_assoc($validar_login);
        $_SESSION['usuario'] = $correo;
        $_SESSION['rol'] = $fila['rol'];

        if($_SESSION['rol'] === 'admin'){
            header("location: usuariosAdmi.php");
        }
        else{
            header("location: ../html/index.html");
        }
        exit;
    }
    else {
    echo '
        <script>
            alert("Usuario incorrecto");
            window.location = "inicioSesion.php";
        </script>
    ';
    exit;
    }
?>