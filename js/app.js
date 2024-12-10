// Importar funciones
import { mostrarProductos, finalizarCompra } from './funciones.js';

// Al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    document.getElementById('finalizar-compra').addEventListener('click', finalizarCompra);
});
