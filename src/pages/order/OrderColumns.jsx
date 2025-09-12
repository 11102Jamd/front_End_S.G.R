

const orderColumns = (setOrderSelected, handleDeleteOrder) => [
    {
        name: 'Proveedor',
        selector: row => row.supplier_name ?? 'N/A',
        sortable: true,
        center: true
    },
    {
        name: 'Fecha de Orden',
        selector: row => row.order_date ?? 'N/A',
        sortable: true,
        center: true
    },
    {
        name: 'Total',
        selector: row => row.order_total,
        cell: row => (
            <span>
                {Number(row.order_total).toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                })}
            </span>
        ),
        sortable: true,
        center: true
    },
    {
        name: 'Cant. Items',
        selector: row => row.batches ? row.batches.length : 0,
        sortable: true,
        center: true
    },
    {
        name: 'Acciones',
        cell: row => (
            <div className="d-flex gap-2" role="group">
                <button
                    onClick={() => setOrderSelected(row)}
                    className='btn btn-info btn-sm ms-2 rounded-2 p-2'
                    title="Ver Detalles"
                >
                    <i className="bi bi-eye fs-6"></i>
                </button>
                <button
                    onClick={() => handleDeleteOrder(row.id)}
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
