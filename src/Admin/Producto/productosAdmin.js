
/*----------------------------------------------------Mostrar productos---------------------------------------------------- */
let productos = [];

async function cargarProductos() {
  const productosRegistrados = localStorage.getItem('productos');

  if (productosRegistrados) {
    productos = JSON.parse(productosRegistrados);
  } else {
    try {

      const respuesta = await fetch('../bdd/json/productos.json');
      productos = await respuesta.json();
      guardarEnMemoria(); 
    } catch (error) {
      console.error('No se pudo cargar el archivo JSON', error);
    }
  }
  renderizarTabla();
}

function renderizarTabla() {
  const contenedorTabla = document.getElementById('table-products');
  if (!contenedorTabla) return;

  contenedorTabla.innerHTML = '';
  productos.forEach(producto => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <th scope="row">${producto.id}</th>
      <td>${producto.titulo}</td>
      <td>$${producto.precio.toLocaleString()}</td>
      <td><img src="../${producto.imagen}" alt="${producto.titulo}" width="50"></td>
    `;
    contenedorTabla.appendChild(fila);
  });
}

function guardarEnMemoria() {
  localStorage.setItem('productos', JSON.stringify(productos));
}

/*----------------------------------------------------Registrar productos---------------------------------------------------- */

function registrarProductos(nuevoProducto) {
  let nuevaSecuencia = 1;

  if (productos.length > 0) {
    const secuencia = productos.map(p => parseInt(p.id.replace('PR', ''), 10) || 0);
    const numeroMayor = Math.max(...secuencia);
    nuevaSecuencia = numeroMayor + 1;
  }

  const id = `PR${nuevaSecuencia.toString().padStart(3, '0')}`;

  const productoCargar = {
    id: id,
    titulo: nuevoProducto.titulo,
    precio: Number(nuevoProducto.precio),
    imagen: nuevoProducto.imagen || "img/productos"
  };

  productos.push(productoCargar);
  guardarEnMemoria();
  renderizarTabla(); // Actualiza la tabla inmediatamente en pantalla
}

/*--------------------------------- Formulario ---------------------------------*/

document.addEventListener('DOMContentLoaded', () => {

  cargarProductos(); 

  const botonAbrir = document.getElementById('ventana-ingreso-productos');
  const cuadro = document.getElementById('cuadro-ingreso-productos');
  const botonCerrar = document.getElementById('btn-cerrar-cuadro');
  const formulario = document.getElementById('forma-ingreso-productos');

  if (botonAbrir && cuadro) {
    botonAbrir.addEventListener('click', () => cuadro.showModal());
  }

  if (botonCerrar && cuadro && formulario) {
    botonCerrar.addEventListener('click', () => {
      cuadro.close(); 
      formulario.reset();
    });
  }

  if (formulario && cuadro) {
    formulario.addEventListener('submit', (e) => {
      e.preventDefault();

      const nuevoProducto = {
        titulo: document.getElementById('ingreso-nombre').value,
        precio: document.getElementById('ingreso-precio').value,
        imagen: document.getElementById('ingreso-imagen').value
      };

      registrarProductos(nuevoProducto);
      formulario.reset();
      cuadro.close();
    });
  }
});