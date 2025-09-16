import React, { useState } from "react";
import { createProduct } from "../../utils/enpoints/product";
import { succesCreateProduct, errorCreateProduct } from "../../utils/alerts/productAlerts";
import { validateName, validatePrice } from "../../utils/validations/validationFields";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';



/**
 * Componente modal para crear un nuevo producto
 * @param {function} onClose - Cierra el modal
 * @param {function} onProductCreated - Callback para actualizar la lista de productos después de crear uno
 */
function CreateProductModal({ onClose, onProductCreated }) {
    // Estado para almacenar los datos del nuevo producto
    const [newProduct, setNewProduct] = useState({
        product_name: '',
        unit_price:''
    });

    // Estado para manejar los erores
    const [errors, setErrors] = useState({});

    /**
     * Valida el formulario de edición del producto.
     * @returns {boolean} - Retorna `true` si no hay errores, `false` en caso contrario.
     */
    const validateProductForm = () => {
        const newErrors = {
            product_name: validateName(newProduct.product_name, 'Nombre del Producto'),
            unit_price: validatePrice(newProduct.unit_price, 'El precio por unidad'),
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== null);
    };

    /**
     * Maneja los cambios en los inputs del formulario
     * Incluye validación en tiempo real si ya había errores
     */
    const handleChange = (e) => {
        
        // Revalida el campo modificado si ya tenía errores
        const { id, value } = e.target;

        setNewProduct(prev => ({ ...prev, [id]: value }));
        
        let error = null;
        switch(id) {
            case 'product_name':
                error = validateName(value, 'Nombre del producto');
                break;
            case 'unit_price':
                error =validatePrice(value, 'El precio por unidad');
                break;
            default:
                break;
        }
        setErrors(prev => ({ ...prev, [id]: error }));
    };

    /**
     * Envía la solicitud para crear un producto
     * Si la validación falla, muestra una alerta de error
     */
    const createProductHandler = async () => {
            if (!validateProductForm()) {
                await errorCreateProduct();
                return;
            }
            try {

                //se ejecuta el enpoint de product pasandole en la solicitud la informaicon del formulario
                await createProduct(newProduct);
                // Alerta de exito
                await succesCreateProduct();
                // Actualiza la lista de productos
                onProductCreated();
                //Cierra el Modal
                onClose();
                //Resetea el fromulario
                setNewProduct({
                    product_name:'',
                    unit_price:''
                });
            } catch (error) {
                console.error("Error al crear el producto", error);
                await errorCreateProduct();
            };
        };
    
    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{backgroundColor:' #176FA6'}}>
                        <h5 className="modal-title">Crear Nuevo Producto</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="product_name" className="form-label">Producto</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-sm ${errors.product_name ? 'is-invalid' : ''}`} 
                                id="product_name" 
                                value={newProduct.product_name} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.product_name && <div className="invalid-feedback">{errors.product_name}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="unit_price" className="form-label">Precio por Unidad</label>
                            <input 
                                type="number" 
                                className={`form-control form-control-sm ${errors.unit_price ? 'is-invalid' : ''}`} 
                                id="unit_price" 
                                value={newProduct.unit_price} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.unit_price && <div className="invalid-feedback">{errors.unit_price}</div>}
                        </div>
                        
                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={createProductHandler} style={{backgroundColor:' #176FA6'}}>
                            Guardar Producto
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default CreateProductModal;