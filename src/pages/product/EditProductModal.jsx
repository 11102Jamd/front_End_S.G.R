import { useState } from "react";
import { validateName, validatePrice } from "../../utils/validations/validationFields";
import { errorUpdateProduct, succesUpdateProduct } from "../../utils/alerts/productAlerts";
import { updateProduct } from "../../utils/enpoints/product";

/**
 * Componente modal para editar un producto existente.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.product - Datos actuales del producto a editar.
 * @param {Function} props.onClose - Función para cerrar el modal.
 * @param {Function} props.onProductUpdate - Función para recargar la lista de Productos tras la actualización.
 */
function EditProductModal({ product, onClose, onProductUpdate }) {
    //Estado para almacenar los datos del producto actualizado
    const [productUpdate, setProductUpdate] = useState(product);

    //Estado que maneja los errores
    const [errors, setErrors] = useState({});

    /**
     * Valida el formulario de edición del usuario.
     * @returns {boolean} - Retorna `true` si no hay errores, `false` en caso contrario.
     */
    const validateEditProductForm = () => {
        const newErrors = {
            product_name: validateName(productUpdate.product_name, 'Nombre del Producto'),
            unit_price: validatePrice(productUpdate.unit_price, 'Precio del Producto')
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== null);
    };

    /**
     * Maneja cambios en los campos del formulario.
     * @param {React.ChangeEvent<HTMLInputElement|HTMLSelectElement>} e - Evento del input.
     */
    const handleChange = (e) => {

        //revalida e l campo modificado si ya tenia errores
        const { id, value } = e.target;
        setProductUpdate(prev => ({ ...prev, [id]: value }));

        let error = null;

        //valida los errores por medio del id del input de entrada del formulario
        switch (id) {
            case 'product_name':
                error = validateName(value, 'Nombre del Producto');
                break;
            case 'unit_price':
                error = validatePrice(value, 'Precio del Producto');
                break;
            default:
                break;
        }
        setErrors(prev => ({ ...prev, [id]: error }));
    };

    const updateProductHandler = async () => {

        if (!validateEditProductForm()) {
            // Si el formulario es inválido, no hacemos la llamada a la API
            return;
        }

        try {
            /**
             * ahora enviamos product.id asegurándonos de que no sea undefined
             * Ejecutamos el enpoint updateProduct enviado los datos del producto actualizado y su id
             */
            await updateProduct(product.id, {
                product_name: productUpdate.product_name,
                unit_price: productUpdate.unit_price
            });

            //Alerta de Exito
            await succesUpdateProduct();
            //Actualiza lista de Productos
            onProductUpdate();
            //Cierra el Modal
            onClose();
        } catch (error) {
            console.error("Error al actualizar el producto", error);
            await errorUpdateProduct();
        }
    };

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{ backgroundColor: '#176FA6' }}>
                        <h5 className="modal-title">Editar Producto</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="product_name" className="form-label">Producto</label>
                            <input
                                type="text"
                                className={`form-control form-control-sm ${errors.product_name ? 'is-invalid' : ''}`}
                                id="product_name"
                                value={productUpdate.product_name}
                                onChange={handleChange}
                                required
                            />
                            {errors.product_name && <div className="invalid-feedback">{errors.product_name}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="unit_price" className="form-label">Precio Unitario</label>
                            <input
                                type="number"
                                className={`form-control form-control-sm ${errors.unit_price ? 'is-invalid' : ''}`}
                                id="unit_price"
                                value={productUpdate.unit_price}
                                onChange={handleChange}
                                required
                            />
                            {errors.unit_price && <div className="invalid-feedback">{errors.unit_price}</div>}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={updateProductHandler}
                            style={{ backgroundColor: '#176FA6' }}
                        >
                            Actualizar Producto
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

export default EditProductModal;
