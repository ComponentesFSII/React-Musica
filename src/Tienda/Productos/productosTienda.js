document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idProducto = urlParams.get('id');

  if (!idProducto) {
    console.error('No se especificó un ID de producto en la URL');
    return;
  }

  fetch('../bdd/json/productos.json')
    .then(response => {
      return response.json();
    })
    .then(productos => {
      const productoActual = productos.find(p => p.id === idProducto);

      const titulo = document.querySelector('.card-productos h1');
      const imagen = document.querySelector('.card-productos-img');
      if (titulo) titulo.innerText = productoActual.titulo;
      if (imagen) imagen.src = productoActual.imagen;

      // Calcular precios e IVA
        const precioProducto = document.getElementById('precioProducto'); 
        const precioIVA = document.getElementById('precioIVA');           
        const precioTotal = document.getElementById('precioTotal');      

        const total = Number(productoActual.precio);
        const precioNeto = Math.round(total / 1.19);
        const totalIVA = total - precioNeto;

        if (precioProducto) precioProducto.innerText = precioNeto.toLocaleString('es-CL');
        if (precioIVA) precioIVA.innerText = totalIVA.toLocaleString('es-CL');
        if (precioTotal) precioTotal.innerText = total.toLocaleString('es-CL');
    })
});