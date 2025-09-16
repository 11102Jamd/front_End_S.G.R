import React from "react";

/**
 * Componente OrderItemsTable
 *
 * Renderiza una tabla con los insumos asociados a una orden de compra.
 * Muestra diferentes vistas según el tamaño de la pantalla:
 *   - Tabla clásica en pantallas medianas o grandes.
 *   - Tarjetas responsivas en pantallas pequeñas.
 *
 * @component
 * @param {Object[]} items - Lista de insumos de la orden.
 * @param {number} items[].input_id - ID del insumo.
 * @param {number} items[].quantity_total - Cantidad total del insumo en la orden.
 * @param {number} items[].unit_price - Precio unitario del insumo.
 * @param {Function} onRemoveItem - Función para eliminar un insumo de la lista.
 *
 * @returns {JSX.Element} Tabla responsiva o mensaje de advertencia.
 */
function OrderItemsTable({ items, onRemoveItem }) {
    /**
     * Caso: No hay insumos agregados a la orden.
     */
    if (items.length === 0) {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="alert alert-warning mb-0">
                        No hay insumos agregados a la orden
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Renderiza la tabla o tarjetas responsivas con los insumos.
     */
    return (
        <div className="card">
            {/* Encabezado de la tarjeta */}
            <div className="card-header bg-light">
                <h6 className="mb-0">Detalle de la Orden</h6>
            </div>

            <div className="card-body p-0">
                {/* Vista para pantallas medianas o grandes */}
                <div className="table-responsive d-none d-md-block">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>ID Insumo</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th style={{ width: "70px" }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.input_id}</td>
                                    <td>{item.quantity_total}</td>
                                    <td>${item.unit_price?.toFixed(0)}</td>
                                    <td>
                                        <button
                                            onClick={() => onRemoveItem(index)}
                                            className="btn btn-danger btn-sm"
                                            title="Eliminar"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Vista responsiva para pantallas pequeñas */}
                <div className="d-block d-md-none p-2">
                    {items.map((item, index) => (
                        <div key={index} className="card mb-2 shadow-sm">
                            <div className="card-body p-2">
                                <p className="mb-1">
                                    <strong>ID Insumo:</strong> {item.input_id}
                                </p>
                                <p className="mb-1">
                                    <strong>Cantidad:</strong> {item.quantity_total}
                                </p>
                                <p className="mb-1">
                                    <strong>Precio Unitario:</strong> $
                                    {item.unit_price?.toFixed(3) || "0.000"}
                                </p>
                                <button
                                    onClick={() => onRemoveItem(index)}
                                    className="btn btn-danger btn-sm mt-2"
                                    title="Eliminar"
                                >
                                    <i className="bi bi-trash"></i> Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OrderItemsTable;
