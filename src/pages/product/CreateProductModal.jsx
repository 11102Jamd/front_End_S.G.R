import React, { useState } from "react";
import { createProduct } from "../../utils/enpoints/product";
import { succesCreateProduct, errorCreateProduct } from "../../utils/alerts/productAlerts";
import { validateName, validatePrice } from "../../utils/validations/validationFields";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';




function CreateProductModal({ onClose, onProductCreated }) {
    const [newProduct, setNewProduct] = useState({
        product_name: '',
        unit_price:''
    });

    const [errors, setErrors] = useState({});
    const validateProductForm = () => {
        const newErrors = {
            product_name: validateName(newProduct.product_name, 'Nombre del Producto'),
            unit_price: validatePrice(newProduct.unit_price, 'El precio por unidad'),
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== null);
    };

    const handleChange = (e) => {
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

    const createProductHandler = async () => {
            if (!validateProductForm()) {
                await errorCreateProduct();
                return;
            }
            try {
                await createProduct(newProduct);
                await succesCreateProduct();
                onProductCreated();
                onClose();
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