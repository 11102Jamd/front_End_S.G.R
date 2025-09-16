import React, { useEffect, useRef, useState } from "react";
import { getProductionDetails } from "../../utils/enpoints/production";
import { errorShowDetailsProduction } from "../../utils/alerts/productionAlerts";
import { formatCurrency } from "../../utils/formatters/currency";

function ShowProductionDetails({ show, onHide, productionId }) {
    const [production, setProduction] = useState(null);
    const [loading, setLoading] = useState(false);
    const abortControllerRef = useRef(null);



    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    useEffect(() => {
        if (!show || !productionId) return;

        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        const fetchProductionDetails = async () => {
            setLoading(true);
            try {
                const data = await getProductionDetails(productionId, { signal });
                setProduction(data);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("Error al cargar los datos de producción", error);
                    await errorShowDetailsProduction();
                    onHide();
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            };
        };

        fetchProductionDetails();

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [show, productionId, onHide]);

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{ backgroundColor: '#176FA6' }}>
                        <h5 className="modal-title">Detalles de Producción</h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onHide}
                            disabled={loading}
                        ></button>
                    </div>

                    <div className="modal-body">
                        {loading ? (
                            <div className="text-center py-4">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                                <p className="mt-2">Cargando detalles de producción...</p>
                            </div>
                        ) : production ? (
                            <>
                                <div className="mb-4">
                                    <h5>Información General</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p><strong>Receta:</strong> {production.recipe?.recipe_name || 'N/A'}</p>
                                            <p><strong>Fecha de Producción:</strong> {new Date(production.production_date).toLocaleDateString()}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p><strong>Cantidad Producida:</strong> {production.quantity_to_produce?.toLocaleString() || '0'} unidades</p>
                                            <p>
                                                <strong>Costo Total:</strong>{" "}
                                                {formatCurrency(production.total_cost || 0, 2)}
                                            </p>
                                            <p>
                                                <strong>Costo por Unidad:</strong>{" "}
                                                {production.quantity_to_produce > 0
                                                    ? formatCurrency(
                                                        production.total_cost / production.quantity_to_produce,
                                                        2
                                                    )
                                                    : "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <h5 className="mb-3">Consumo de Insumos</h5>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Insumo</th>
                                                <th>Cantidad Utilizada</th>
                                                <th>Precio Unitario</th>
                                                <th>Lote Utilizado</th>
                                                <th>Costo Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {production.production_consumptions?.length > 0 ? (
                                                production.production_consumptions.map((consumption, index) => (
                                                    <tr key={index}>
                                                        <td>{consumption.input?.name || `Insumo ID: ${consumption.input_id}`}</td>
                                                        <td>{consumption.quantity_used?.toLocaleString()} g</td>
                                                        <td>{formatCurrency(consumption.batch?.unit_price || 0, 2)}</td>
                                                        <td>{consumption.batch?.batch_number || 'N/A'}</td>
                                                        <td>{formatCurrency(consumption.total_cost || 0, 2)}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center">No hay registros de consumo</td>
                                                </tr>
                                            )}
                                        </tbody>
                                        <tfoot className="table-light">
                                            <tr>
                                                <td colSpan="4" className="text-end fw-bold">Costo Total de Producción:</td>
                                                <td className="fw-bold">{formatCurrency(production.total_cost || 0, 2)}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>

                                {production.product_production?.length > 0 && (
                                    <>
                                        <h5 className="mb-3 mt-4">Productos Generados</h5>
                                        <div className="table-responsive">
                                            <table className="table table-bordered">
                                                <thead className="table-secondary">
                                                    <tr>
                                                        <th>Producto</th>
                                                        <th>Cantidad</th>
                                                        <th>Fecha de Expiración</th>
                                                        <th>Lote</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {production.product_production.map((product, index) => (
                                                        <tr key={index}>
                                                            <td>{product.product?.name || `Producto ID: ${product.product_id}`}</td>
                                                            <td>{product.quantity} unidades</td>
                                                            <td>{product.expiration_date ? new Date(product.expiration_date).toLocaleDateString() : 'N/A'}</td>
                                                            <td># {product.batch_number || product.id}</td>
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
                                No se encontraron datos de la producción
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

export default ShowProductionDetails;