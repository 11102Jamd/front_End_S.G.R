import React, { useEffect, useRef, useState } from "react";
import { getManufacturingDetails } from "../../utils/enpoints/manufacturing";
import { errorLoadManufacturing } from "../../utils/alerts/alertsManufacturing";

function ShowManufacturing({show, onHide, manufacturingId}){
    const [manufacturing, setManufacturing] = useState(null);
    const [loading, setLoading] = useState(false);
    const abortControllerRef = useRef(null);

    useEffect(() => {
        // Función de limpieza
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);


    useEffect(() => {
        if (!show || !manufacturingId) return;

        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        const fetchManufacturingDetails = async () => {
            setLoading(true);
            try {
                const data = await getManufacturingDetails(manufacturingId, {signal});
                setManufacturing(data);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("Error al cargar los datos de la fabricación", error);
                    await errorLoadManufacturing();
                    onHide();
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            };
        };

        fetchManufacturingDetails();

        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [show, manufacturingId, onHide]);

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{ backgroundColor: '#176FA6' }}>
                        <h5 className="modal-title">Detalles de Fabricación</h5>
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
                                <p className="mt-2">Cargando detalles de fabricación...</p>
                            </div>
                        ) : manufacturing ? (
                            <>
                                <div className="mb-4">
                                    <h5>Información General</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p><strong>Producto:</strong> {manufacturing?.product?.ProductName || 'N/A'}</p>
                                            <p><strong>Tiempo de Fabricación:</strong> {manufacturing.ManufacturingTime} minutos</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p><strong>Mano de Obra:</strong> ${manufacturing.Labour?.toLocaleString() || '0'}</p>
                                            <p><strong>Costo Total:</strong> ${manufacturing.TotalCostProduction?.toLocaleString() || '0'}</p>
                                        </div>
                                    </div>
                                </div>

                                <h5 className="mb-3">Receta de Fabricación</h5>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Insumo</th>
                                                <th>Cantidad</th>
                                                <th>Unidad</th>
                                                <th>Costo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {manufacturing.recipes?.length > 0 ? (
                                                manufacturing.recipes.map((recipe, index) => (
                                                    <tr key={index}>
                                                        <td>{recipe.input?.InputName || 'Insumo no encontrado'}</td>
                                                        <td>{recipe.AmountSpent}</td>
                                                        <td>{recipe.UnitMeasurement}</td>
                                                        <td>${recipe.PriceQuantitySpent?.toLocaleString() || '0'}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="text-center">No hay recetas registradas</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : (
                            <div className="alert alert-warning">
                                No se encontraron datos de fabricación
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

export default ShowManufacturing;