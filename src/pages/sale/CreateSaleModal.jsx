// Importaciones necesarias
import { useState } from 'react'; 
import { useAuth } from '../../context/AuthContext'; 
import { createSale } from '../../utils/enpoints/sale.js'; 
import { errorCreateSale, successCreateSale } from '../../utils/alerts/alertsSale'; 
import SaleProductsTable from './SaleProductTable'; 
import ProductSelector from './ProductSelector'; 

//  Creo el Componente principal del modal de creación de venta, estado guarad la venta y la función para enviarla al backend
function CreateSaleModal({ onClose, onSaleCreated }) {

    const { user } = useAuth(); 
    const [sale, setSale] = useState({
        sale_date: new Date().toISOString().split('T')[0], 
        products: [] 
    });

    const [currentProduct, setCurrentProduct] = useState({
        product_id: '', 
        quantity_requested: '' 
    });

    
    const [loading, setLoading] = useState(false);

    // Función para agregar un producto a la venta, actualizando el estado
    const addProduct = () => {
        if (!currentProduct.product_id || !currentProduct.quantity_requested) {
            return;
        }

        const newProduct = {
            product_id: parseInt(currentProduct.product_id), 
            quantity_requested: parseFloat(currentProduct.quantity_requested) 
        };

        setSale(prev => ({ 
            ...prev, 
            products: [...prev.products, newProduct] 
        }));

        setCurrentProduct({
            product_id: '',
            quantity_requested: ''
        });
    };

    // Función para eliminar un producto de la venta según su índice y actualizar el estado
    const removeProduct = (index) => {
        const updatedProducts = [...sale.products];
        updatedProducts.splice(index, 1); 
        setSale({ ...sale, products: updatedProducts }); 
    };

    // Función para actualizar el producto temporal cuando el usuario cambia los inputs
    const handleProductChange = (e) => {
        setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
    };
    const handleSubmit = async () => {

        if (!user || !user.id || sale.products.length === 0) {
            return;
        }

        setLoading(true); 
        try {
            // Construir los datos de la venta incluyendo el ID del usuario
            const saleData = {
                ...sale,
                user_id: user.id
            };
            // Llamada al backend para crear la venta, manejo de respuestas y errores
            await createSale(saleData); 
            await successCreateSale(); 
            onSaleCreated?.(); 
            onClose(); 
        } catch (error) {
            console.error("Error al crear venta:", error);
            await errorCreateSale(error.response?.data?.message || error.message); 
        } finally {
            setLoading(false); 
        }
    };

    // Renderizado del modal
    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    {/* Header del modal */}
                    <div className="modal-header text-white" style={{backgroundColor:' #176FA6'}}>
                        <h5 className="modal-title">Registrar Venta</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>

                    {/* Body del modal */}
                    <div className="modal-body">
                        <div className="mb-4">
                            <label className="form-label">Vendedor</label>
                            <input
                                type="text"
                                className="form-control"
                                value={user ? `${user.name}` : 'No autenticado'}
                                disabled
                            />
                            <small className="form-text text-muted">
                                Usted está registrado como el vendedor de esta venta
                            </small>
                        </div>
                        <ProductSelector
                            currentProduct={currentProduct} 
                            onProductChange={handleProductChange} 
                            onAddProduct={addProduct} 
                        />
                        <SaleProductsTable
                            products={sale.products} 
                            onRemoveProduct={removeProduct} 
                        />
                    </div>

                    {/* Footer del modal */}
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={handleSubmit}
                            disabled={sale.products.length === 0 || !user}
                            style={{background:'#176FA6'}}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    Guardando...
                                </>
                            ) : 'Registrar Venta'}
                        </button>

                        {/* Botón para cancelar y cerrar modal */}
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Exportar componente para usarlo en otras partes de la app
export default CreateSaleModal;
