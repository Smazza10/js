let carrito = [];

// Mostrar productos desde productos.json
export async function mostrarProductos() {
    try {
        const response = await fetch('data/productos.json');
        const productos = await response.json();

        const listaProductos = document.getElementById('lista-productos');
        listaProductos.innerHTML = '';

        productos.forEach((producto) => {
            const item = document.createElement('div');
            item.classList.add('producto');
            item.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <button class="btn-agregar" data-id="${producto.id}">Agregar al Carrito</button>
            `;
            listaProductos.appendChild(item);
        });

        // Agregar eventos a los botones
        document.querySelectorAll('.btn-agregar').forEach((boton) => {
            boton.addEventListener('click', (e) => {
                const idProducto = parseInt(e.target.dataset.id);
                agregarAlCarrito(idProducto, productos);
            });
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Agregar producto al carrito
export function agregarAlCarrito(id, productos) {
    const producto = productos.find((prod) => prod.id === id);
    if (producto) {
        carrito.push(producto);
        actualizarCarrito();
    }
}

// Actualizar carrito en el DOM
export function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total');

    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((producto, index) => {
        total += producto.precio;
        const item = document.createElement('div');
        item.innerHTML = `
            <p>${producto.nombre} - $${producto.precio}</p>
            <button class="btn-eliminar" data-index="${index}">Eliminar</button>
        `;
        listaCarrito.appendChild(item);
    });

    // Agregar eventos a los botones de eliminar
    document.querySelectorAll('.btn-eliminar').forEach((boton) => {
        boton.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            eliminarDelCarrito(index);
        });
    });

    totalCarrito.textContent = total;
}

// Eliminar producto del carrito
export function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Finalizar compra
export function finalizarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
    } else {
        alert('Compra realizada con éxito.');
        carrito = [];
        actualizarCarrito();
    }
}
