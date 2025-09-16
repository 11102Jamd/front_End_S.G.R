/**
 * Define las columnas de la tabla de compras.
 *
 * @param {function} setOrderSelected - Función para seleccionar una orden y ver sus detalles.
 * @param {function} handleDeleteOrder - Función para eliminar una orden específica.
 * @returns {Array} Arreglo de objetos que representan las columnas configuradas para la tabla.
 */
const orderColumns = (setOrderSelected, handleDeleteOrder) => [
    {
        name: 'Proveedor',
        selector: row => row.supplier_name ?? 'N/A', // Obtiene el nombre del proveedor o muestra "N/A" si no existe
        sortable: true, // Permite ordenar la columna
        center: true,   // Centra el contenido
    },
    {
        name: 'Fecha de Orden',
        selector: row => row.order_date ?? 'N/A', // Obtiene la fecha de la orden o "N/A" si no existe
        sortable: true,
        center: true,
    },
    {
        name: 'Total',
        selector: row => row.order_total, // Valor total de la orden (numérico)
        cell: row => (
            <span>
                {Number(row.order_total).toLocaleString("es-CO", {
                    style: "currency",        // Muestra el formato como moneda
                    currency: "COP",          // Peso colombiano
                    minimumFractionDigits: 0, // No muestra decimales
                    maximumFractionDigits: 0, // No permite decimales
                })}
            </span>
        ),
        sortable: true,
        center: true,
    },
    {
        name: 'Cant. Items',
        selector: row => row.batches ? row.batches.length : 0, // Cuenta la cantidad de items, si no hay devuelve 0
        sortable: true,
        center: true,
    },
    {
        name: 'Acciones',
        cell: row => (
            <div className="d-flex gap-2" role="group">

                {/* Botón para ver detalles de la orden */}
                <button
                    onClick={() => setOrderSelected(row)} // Pasa la orden seleccionada al padre
                    className='btn btn-info btn-sm ms-2 rounded-2 p-2'
                    title="Ver Detalles"
                >
                    <i className="bi bi-eye fs-6"></i>
                </button>

                {/* Botón para eliminar la orden */}
                <button
                    onClick={() => handleDeleteOrder(row.id)} // Llama la función de eliminación con el id de la orden
                    className='btn btn-danger btn-sm rounded-2 p-2'
                    style={{ background: '#D6482D' }}
                    title="Eliminar"
                >
                    <i className="bi bi-trash fs-6"></i>
                </button>
            </div>
        ),
        ignoreRowClick: true, // Ignora clics sobre la fila (solo botones funcionan)
    },
];

export default orderColumns;
