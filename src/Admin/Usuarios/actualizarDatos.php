<!--query para actualizar los datos del usuario de la vista administrador-->
<?php

    include '../php/conexion.php';
    $id = $_POST['id'];
    $nombre_completo = $_POST['nombre_completo'];
    $rut = $_POST['rut'];
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];
    $contrasena_confimarcion = $_POST['contrasenaConf'];
    $telefono = $_POST['telefono'];
    $comuna = $_POST['comuna'];
    $region = $_POST['region'];
    $rol = $_POST['rol']; 

    $query = "UPDATE usuarios SET nombre_completo='$nombre_completo',rut='$rut',correo='$correo',contrasena='$contrasena',telefono='$telefono',region='$region',comuna='$comuna',rol='$rol' WHERE id='$id'";

    //verificar que el correo no se repita en la base de datos
    $verificar_correo = mysqli_query($conexion, "SELECT * FROM usuarios WHERE correo='$correo' AND id != '$id' ");
    if(mysqli_num_rows($verificar_correo) > 0){
        echo '
            <script>
                alert("Este correo ya esta registrado");
                window.location = "editarUsuario.php?id='.$id.'";
            </script>
        ';
        exit;
    }

    //verificar contraseña confimacion
    $verificar_contrasena = ($contrasena == $contrasena_confimarcion);
    if(!$verificar_contrasena){
         echo '
            <script>
                alert("Contraseñas no coinciden");
                window.location = "editarUsuario.php?id='.$id.'";
            </script>
        ';
        exit;
    }

    $ejecutar = $verificar_contrasena && mysqli_query($conexion, $query);

    if($ejecutar){
        echo '
            <script> 
                alert("Usuario Actalizado");
                window.location = "usuariosAdmi.php";
            </script>
        ';
    }
    else{
        echo '
            <script> 
                alert("Error al actualizar el usuario");
                window.location = "usuariosAdmi.php?id='.$id.'";
            </script>
        ';
    }

    mysqli_close($conexion);
?>