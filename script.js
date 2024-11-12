// Productos disponibles
const productos = [
  { id: 1, nombre: "Camiseta", precio: 500 },
  { id: 2, nombre: "Pantalón", precio: 800 },
  { id: 3, nombre: "Zapatillas", precio: 1200 }
];

let carrito = [];
let total = 0;

// Cargar productos al DOM
function mostrarProductos() {
  const listaProductos = document.getElementById("lista-productos");
  listaProductos.innerHTML = ""; // Limpiar contenido previo

  productos.forEach((producto) => {
      const item = document.createElement("div");
      item.className = "producto";
      item.innerHTML = `
          <h3>${producto.nombre}</h3>
          <p>Precio: $${producto.precio}</p>
          <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
      `;
      listaProductos.appendChild(item);
  });
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(prod => prod.id === id);
  if (producto) {
      carrito.push(producto);
      total += producto.precio;
      actualizarCarrito();
      guardarCarritoLocalStorage();
  }
}

// Mostrar contenido del carrito en el DOM
function actualizarCarrito() {
  const listaCarrito = document.getElementById("lista-carrito");
  listaCarrito.innerHTML = ""; // Limpiar contenido previo

  carrito.forEach((producto, index) => {
      const item = document.createElement("div");
      item.className = "producto-carrito";
      item.innerHTML = `
          <p>${producto.nombre} - $${producto.precio}</p>
          <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
      `;
      listaCarrito.appendChild(item);
  });

  document.getElementById("total-carrito").textContent = total;
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
  total -= carrito[index].precio;
  carrito.splice(index, 1);
  actualizarCarrito();
  guardarCarritoLocalStorage();
}

// Guardar carrito en localStorage
function guardarCarritoLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("total", total);
}

// Cargar carrito de localStorage al iniciar
function cargarCarritoLocalStorage() {
  const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
  const totalStorage = parseInt(localStorage.getItem("total"));

  if (carritoStorage && totalStorage) {
      carrito = carritoStorage;
      total = totalStorage;
      actualizarCarrito();
  }
}

// Confirmar compra
document.getElementById("confirmar-compra").addEventListener("click", () => {
  if (carrito.length > 0) {
      alert("Compra confirmada. ¡Gracias por tu compra!");
      carrito = [];
      total = 0;
      actualizarCarrito();
      localStorage.clear();
  } else {
      alert("El carrito está vacío.");
  }
});

// Inicializar página
mostrarProductos();
cargarCarritoLocalStorage();
