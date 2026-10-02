document.getElementById("btn_registrarse").addEventListener("click",registro);
document.getElementById("btn_iniciar-sesion").addEventListener("click",iniciarSesion);

var formulario_login = document.querySelector(".formulario_login");
var formulario_registro = document.querySelector(".formulario_registro");
var contenedor_login_registro = document.querySelector(".contenedor_login-registro")
var caja_trasera_login = document.querySelector(".caja_trasera-login")
var caja_trasera_registro = document.querySelector(".caja_trasera-registro")

function iniciarSesion(){
    formulario_registro.style.display = "none";
    contenedor_login_registro.style.left = "10px";
    formulario_login.style.display = "block";
    caja_trasera_registro.style.opacity = "1";
    caja_trasera_login.style.opacity = "0";

}
function registro(){
    formulario_registro.style.display = "block";
    contenedor_login_registro.style.left = "410px";
    formulario_login.style.display = "none";
    caja_trasera_registro.style.opacity = "0";
    caja_trasera_login.style.opacity = "1";

}
