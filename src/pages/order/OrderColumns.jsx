//Define las columnas para la tabla de compras
const orderColumns = (setOrderSelected, handleDeleteOrder) => [
    {
        name: 'Proveedor',
        selector: row => row.supplier_name ?? 'N/A',//Obtiene el nombre del proveedor y si no existe muestra N/A
        sortable: true,
        center: true
    },
    {
        name: 'Fecha de Orden',
        selector: row => row.order_date ?? 'N/A',//Obtiene la fecha del pedido
        sortable: true,
        center: true
    },
    {
        name: 'Total',
        selector: row => row.order_total,//Obtiene el total del pedido
        cell: row => (
            <span>
                {Number(row.order_total).toLocaleString("es-CO", {
                    style: "currency",//Establece el estilo como moneda
                    currency: "COP",//Moneda a COP
                    minimumFractionDigits: 0,//No muestra los decimales
                    maximumFractionDigits: 0//No permite los decimales
                })}
            </span>
        ),
        sortable: true,
        center: true
    },
    {
        name: 'Cant. Items',
        selector: row => row.batches ? row.batches.length : 0,//Cuenta los elementos y no hay devuelve 0
        sortable: true,
        center: true
    },
    {
        name: 'Acciones',
        cell: row => (
            <div className="d-flex gap-2" role="group">
                <button
                    onClick={() => setOrderSelected(row)}//Selecciona la compra para ver sus detalles
                    className='btn btn-info btn-sm ms-2 rounded-2 p-2'
                    title="Ver Detalles"
                >
                    <i className="bi bi-eye fs-6"></i>
                </button>
                <button
                    onClick={() => handleDeleteOrder(row.id)}//Llama la función para eliminar la compra
                    className='btn btn-danger btn-sm rounded-2 p-2'
                    style={{ background: '#D6482D' }}
                    title="Eliminar"
                >
                    <i className="bi bi-trash fs-6"></i>
                </button>
            </div>
        ),
        ignoreRowClick: true,
    },
];

export default orderColumns;
