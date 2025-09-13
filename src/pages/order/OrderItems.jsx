import React from 'react';

//Funcion que muestra la tabla con los insumos de una compra
function OrderItemsTable({ items, onRemoveItem }) {
    //Si no hay insumos muestra un mensaje de advertencia
    if (items.length === 0) {
        return (
            <div className="card">
                <div className="card-body">
                    <div className="alert alert-warning mb-0">No hay insumos agregados a la orden</div>
                </div>
            </div>
        );
    }

    //Renderiza el componente cuando existen insumos en la compra
    return (
        <div className="card">
            <div className="card-header bg-light">
                <h6 className="mb-0">Detalle de la Orden</h6>
            </div>
            <div className="card-body p-0">

                {/*vista pantallas medianas */}
                <div className="table-responsive d-none d-md-block">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>ID Insumo</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th style={{ width: '70px' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.input_id}</td>
                                    <td>{item.quantity_total}</td>
                                    <td> ${item.unit_price?.toFixed(0)}</td> {/*Precio unitario formateado*/}
                                    <td>
                                        <button
                                            onClick={() => onRemoveItem(index)}//Al hacer clic elimina el insumo de la compra
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

                {/* Responsive pantallas pequeñas*/}
                <div className="d-block d-md-none p-2">
                    {items.map((item, index) => (
                        <div key={index} className="card mb-2 shadow-sm">
                            <div className="card-body p-2">
                                <p className="mb-1"><strong>ID Insumo:</strong> {item.input_id}</p>
                                <p className="mb-1"><strong>Cantidad:</strong> {item.quantity_total}</p>
                                <p className="mb-1"><strong>Precio Unitario:</strong> ${item.unit_price?.toFixed(3) || '0.000'}</p>{/*Precio unitario con un formato legible*/}
                                <button
                                    onClick={() => onRemoveItem(index)}//Funcion para eliminar el insummo
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
