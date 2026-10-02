<!--elimina el usuario-->
<?php

    include '../php/conexion.php';
    $id = $_GET['id'];

    $query = "DELETE FROM usuarios WHERE id='$id'";

    $ejecutar = mysqli_query($conexion, $query);

    if($ejecutar){
        echo '
            <script> 
                alert("Usuario Eliminado '.$id.'");
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