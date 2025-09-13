import React, { useEffect, useRef, useState } from "react";
import { showOrder } from "../../utils/enpoints/purchase";
import { errorShowDetails } from "../../utils/alerts/alertsOrder";
import { formatCurrency } from './format/format';

//Presenta los detalles de la compra
function ShowOrder({ show, onHide, orderId }) {
    const [order, setOrder] = useState(null);//Almacena los detalles de la compra
    const [loading, setLoading] = useState(false);//Controla la carga de datos
    const abortControllerRef = useRef(null);

    //Limpia la solicitud pendiente cuando el componente se desmonta
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    //Obtiene los detalles de la compra cuando se muestra el componente y hay un ID de la compra
    useEffect(() => {
        //Si no se debe mostrar o no hay un ID
        if (!show || !orderId) return;

        abortControllerRef.current = new AbortController();//Inicializa un nuevo controlador de aborto
        const signal = abortControllerRef.current.signal;//Obtiene la señal para poder abortar

        //Función asíncrona para obtener los detalles de la compra desde la API
        const fetchOrderDetails = async () => {
            setLoading(true);
            try {
                const data = await showOrder(orderId, { signal });//Realiza la solicitud y obtiene la compra
                setOrder(data);//Almacena los datos de la compra en el estado
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("Error al cargar los datos de la orden", error);
                    await errorShowDetails();
                    onHide();//Cierre el modal
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchOrderDetails();//Ejecuta la función para obtener los detalles de la compra

        //Retorna una limpieza al desmontar el componente
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [show, orderId, onHide]);//Dependencias del efecto

    if (!show) return null;//Si es diferente a show retorna null

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{ backgroundColor: '#176FA6' }}>
                        <h5 className="modal-title">Detalles de Orden de Compra</h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onHide}//Evento de clic para cerrar el modal
                            disabled={loading}//Deshabilita el boton mientras carga
                        ></button>
                    </div>

                    <div className="modal-body">
                        {loading ? (
                            <div className="text-center py-4">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                                <p className="mt-2">Cargando detalles de la orden...</p>
                            </div>
                        ) : order ? (
                            <>
                                {/* Información general */}
                                <div className="mb-4">
                                    <h5>Información General</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p><strong>Proveedor:</strong> {order.supplier_name || 'N/A'}</p>
                                            <p><strong>Fecha de Orden:</strong> {new Date(order.order_date).toLocaleDateString()}</p>{/*Fecha de compra formateada*/}
                                        </div>
                                        <div className="col-md-6">
                                            <p><strong>Total de la Orden:</strong> ${formatCurrency(order.order_total)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Tabla de Items */}
                                <h5 className="mb-3">Items de la Orden</h5>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Insumo</th>
                                                <th>Cantidad</th>
                                                <th>Precio Unitario</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.batches?.length > 0 ? (
                                                order.batches.map((batch, index) => (
                                                    <tr key={index}>
                                                        <td>{batch.input?.name || `Insumo ID: ${batch.input_id}`}</td>
                                                        <td>{batch.quantity_total.toLocaleString()} {batch.input?.unit || 'un'}</td>
                                                        <td>${formatCurrency(batch.unit_price)}</td>
                                                        <td>${formatCurrency(batch.subtotal_price)}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="text-center">No hay items en esta orden</td>
                                                </tr>
                                            )}
                                        </tbody>
                                        <tfoot className="table-light">
                                            <tr>
                                                <td colSpan="3" className="text-end fw-bold">Total:</td>
                                                <td className="fw-bold">${formatCurrency(order.order_total)}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>

                                {/* Tabla de Lotes */}
                                {order.batches?.length > 0 && (
                                    <>
                                        <h5 className="mb-3 mt-4">Lotes Recibidos</h5>
                                        <div className="table-responsive">
                                            <table className="table table-bordered">
                                                <thead className="table-secondary">
                                                    <tr>
                                                        <th>Insumo</th>
                                                        <th>Unidad Original</th>
                                                        <th>Lote</th>
                                                        <th>Cantidad</th>
                                                        <th>Fecha de Recepción</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {order.batches.map((batch, index) => (
                                                        <tr key={index}>
                                                            <td>{batch.input?.name || `Insumo ID: ${batch.input_id}`}</td>
                                                            <td>{batch.input?.unit}</td>
                                                            <td># {batch.batch_number || batch.id}</td>
                                                            <td>{batch.quantity_remaining || batch.quantity_total} g</td>
                                                            <td>{batch.received_date ? new Date(batch.received_date).toLocaleDateString() : 'N/A'}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="alert alert-warning">
                                No se encontraron datos de la orden
                            </div>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            onClick={onHide}
                            disabled={loading}
                        >
                            {loading ? 'Cerrar (cargando...)' : 'Cerrar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowOrder;
