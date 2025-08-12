import React, { useState } from "react";
import { validateName, validatePrice, validateQuantity } from "../../utils/validations/validationFields";
import { errorCreateProduct, errorFormProduct, successCreateProduct } from "../../utils/alerts/alertsProducts";
import { createProduct } from "../../utils/enpoints/product";

function CreateProductModal({onClose, onProductCreated}){
    const [newProduct, setNewProduct] = useState({
        ProductName:'',
        InitialQuantity:'',
        UnityPrice:''
    });

    const [errors, setErrors] = useState({});

    const validateProductForm = () => {
        const newErrors = {
            ProductName: validateName(newProduct.ProductName, 'Nombre del Producto'),
            InitialQuantity: validateQuantity(newProduct.InitialQuantity, 'la cantidad'),
            UnityPrice: validatePrice(newProduct.UnityPrice, 'El precio por unidad'),
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== null);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewProduct(prev => ({ ...prev, [id]: value }));
        
        // Validación en tiempo real (opcional)
        if (errors[id]) {
            let error = null;
            switch(id) {
                case 'ProductName:':
                    error = validateName(value, 'Nombre del producto');
                    break;
                case 'InitialQuantity':
                    error = validateQuantity(value);
                    break;
                case 'UnityPrice':
                    error =validatePrice(value, 'El precio por unidad');
                    break;
                default:
                    break;
            }
            setErrors(prev => ({ ...prev, [id]: error }));
        };
    };

    const createProductHandler = async () => {
        if (!validateProductForm()) {
            await errorFormProduct();
            return;
        }
        try {
            await createProduct(newProduct);
            await successCreateProduct();
            onProductCreated();
            onClose();
            setNewProduct({
                ProductName:'',
                InitialQuantity:'',
                UnityPrice:''
            });
        } catch (error) {
            console.error("Error al crear el producto", error);
            await errorCreateProduct();
        };
    };

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{backgroundColor:' #176FA6'}}>
                        <h5 className="modal-title">Crear Nuevo Producto</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="ProductName" className="form-label">Producto</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-lg ${errors.ProductName ? 'is-invalid' : ''}`} 
                                id="ProductName" 
                                value={newProduct.ProductName} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.ProductName && <div className="invalid-feedback">{errors.ProductName}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="InitialQuantity" className="form-label">Cantidad Inicial</label>
                            <input 
                                type="number" 
                                className={`form-control form-control-lg ${errors.InitialQuantity ? 'is-invalid' : ''}`} 
                                id="InitialQuantity" 
                                value={newProduct.InitialQuantity} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.InitialQuantity && <div className="invalid-feedback">{errors.InitialQuantity}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="UnityPrice" className="form-label">Precio por Unidad</label>
                            <input 
                                type="number" 
                                className={`form-control form-control-lg ${errors.UnityPrice ? 'is-invalid' : ''}`} 
                                id="UnityPrice" 
                                value={newProduct.UnityPrice} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.UnityPrice && <div className="invalid-feedback">{errors.UnityPrice}</div>}
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
    );
}
export default CreateProductModal;