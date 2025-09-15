// Importaciones necesarias
import React, { useState, useEffect } from 'react'; 
import { getProduct } from '../../utils/enpoints/product'; 
import LoadingSpinner from '../../components/LoadingSpinner'; 

// Creo el Componente ProductSelector que permite seleccionar productos y cantidades
function ProductSelector({ currentProduct, onProductChange, onAddProduct }) {

    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect para cargar los productos cuando el componente se monta, llamando al endpoint correspondiente
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProduct(); 
                setProducts(data); 
            } catch (error) {
                console.error("Error cargando productos:", error); 
            } finally {
                setLoading(false); 
            }
        };
        fetchProducts(); 
    }, []); 

    // Mostrar spinner mientras se cargan los productos
    if (loading) {
        return (
            <div className="card mb-4">
                <div className="card-body text-center py-4">
                    <LoadingSpinner message="Cargando Productos"/> 
                </div>
            </div>
        );
    }

    // Renderizado del selector de productos y cantidad
    return (
        <div className="card mb-4">
            <div className="card-header bg-light">
                <h6 className="mb-0">Agregar Productos</h6>
            </div>


            <div className="card-body">
                <div className="row g-3">
                    {/* Selector de producto */}
                    <div className="col-md-6">
                        <label htmlFor="product_id" className="form-label">Producto</label>
                        <select 
                            className="form-select"
                            id="product_id"
                            name="product_id"
                            value={currentProduct.product_id}
                            onChange={onProductChange}
                            required
                        >
                            <option value="">Seleccione un producto</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.product_name} 
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Input de cantidad */}
                    <div className="col-md-4">
                        <label htmlFor="quantity_requested" className="form-label">Cantidad</label>
                        <input 
                            type="number" 
                            className="form-control"
                            id="quantity_requested"
                            name="quantity_requested"
                            value={currentProduct.quantity_requested}
                            onChange={onProductChange}
                            min="1"
                            step="1"
                            required
                        />
                    </div>

                    {/* Botón para agregar producto */}
                    <div className="col-md-2 d-flex align-items-end">
                        <button 
                            onClick={onAddProduct}
                            className="btn btn-primary w-100"
                            disabled={!currentProduct.product_id || !currentProduct.quantity_requested} // Deshabilita si no hay producto o cantidad
                        >
                            <i className="bi bi-plus-lg me-2"></i>Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Exportar componente para usarlo en otras partes de la app
export default ProductSelector;
