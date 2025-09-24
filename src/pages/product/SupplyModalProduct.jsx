import React, { useEffect, useState } from "react";
import { getProduction } from "../../utils/enpoints/production";
import { errorSupplyProduct, successSupplyProduct } from "../../utils/alerts/productAlerts";
import {linkProductionToProduct} from "../../utils/enpoints/product";

function SupplyProductModal({ product, onClose, onProductSupplied }) {
    const [productions, setProductions] = useState([]);
    const [selectedProduction, setSelectedProduction] = useState('');
    const [loading, setLoading] = useState(true);
    const [supplying, setSupplying] = useState(false);

    useEffect(() => {
        const fetchProductions = async () => {
            try {
                setLoading(true);
                const productionsData = await getProduction();
                setProductions(productionsData);
            } catch (error) {
                console.error("Error al cargar producciones", error);
            } finally {
                setLoading(false);
            }
        };

        if (product) {
            fetchProductions();
        }
    }, [product]);

    const handleSupply = async () => {
        if (!selectedProduction) return;

        setSupplying(true);
        try {
            await linkProductionToProduct(selectedProduction, product.id);
            await successSupplyProduct();
            onProductSupplied();
            onClose();
        } catch (error) {
            console.error("Error al abastecer producto:", error);
            await errorSupplyProduct();
        } finally {
            setSupplying(false);
        }
    };

    if (loading) {
        return (
            <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-body text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <p className="mt-3">Cargando</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{backgroundColor:' #176FA6'}}>
                        <h5 className="modal-title">Abastecer Producto</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label fw-bold">Producto:</label>
                            <p className="form-control-static">{product.name}</p>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Stock Actual:</label>
                            <p className="form-control-static">
                                {parseFloat(product.latestProduction?.[0]?.quantity_produced || 0).toFixed(2)} {product.unit}
                            </p>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="production_id" className="form-label">Seleccionar Producción</label>
                            <select 
                                className="form-select form-select-sm"
                                id="production_id"
                                value={selectedProduction}
                                onChange={(e) => setSelectedProduction(e.target.value)}
                                required
                            >
                                <option value="">Seleccione una producción</option>
                                {productions.map(production => (
                                    <option key={production.id} value={production.id}>
                                        {production.recipe?.recipe_name} - {production.quantity_to_produce} {production.recipe?.unit} 
                                        {production.production_date && ` (${new Date(production.production_date).toLocaleDateString()})`}
                                    </option>
                                ))}
                            </select>
                            <small className="form-text text-muted">
                                Seleccione una producción disponible para vincular a este producto
                            </small>
                        </div>

                        {selectedProduction && (
                            <div className="alert alert-info">
                                <strong>Información de la producción seleccionada:</strong><br/>
                                {productions.find(p => p.id == selectedProduction)?.recipe?.recipe_name} - 
                                Cantidad: {productions.find(p => p.id == selectedProduction)?.quantity_to_produce}
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={handleSupply}
                            disabled={!selectedProduction || supplying}
                            style={{backgroundColor:'#176FA6', borderColor: '#176FA6'}}
                        >
                            {supplying ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    Abasteciendo...
                                </>
                            ) : (
                                'Abastecer Producto'
                            )}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SupplyProductModal;