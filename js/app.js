// Importar funciones
import { mostrarProductos, actualizarCarrito, finalizarCompra } from './funciones.js';

// Al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    document.getElementById('finalizar-compra').addEventListener('click', finalizarCompra);
});
