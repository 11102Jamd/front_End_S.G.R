import React, { useState } from "react";
import { validateName } from "../../utils/validations/validationFields";
import { errorUpdateInput, successUpdateInput } from "../../utils/alerts/alertsInputs";
import { updateInputs } from "../../utils/enpoints/input";

/**
 * Componente modal para editar un insumo existente.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.product - Datos actuales del insumo a editar.
 * @param {Function} props.onClose - Función para cerrar el modal.
 * @param {Function} props.onProductUpdate - Función para recargar la lista de insumos tras la actualización.
 */
function EditInputModal({input, onClose, onInputUpdated}){
    //Estado para almacenar los datos del insumo actualizado
    const [inputUpdate, setInputUpdate] = useState(input);

    //Estado que maneja errores
    const [errors, setErrors] = useState({});

    /**
     * Valida el formulario de edición del usuario.
     * @returns {boolean} - Retorna `true` si no hay errores, `false` en caso contrario.
     */
    const validateFormEditInput = () => {
        const newErrors = {
            name: validateName(inputUpdate.name, 'Nombre del insumo'),
            category: !inputUpdate.category ? 'La categoria es requerida' : null  
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

        setInputUpdate(prev => ({ ...prev, [id]: value }));
        
        let error = null;

        //valida los errores por medio del id del input de entrada del formulario
        switch(id) {
            case 'name':
                error = validateName(value, 'Nombre del Insumo');
                break;
            case 'category':
                error = !inputUpdate.category ? 'La categoria es requerida' : null 
                break;
            default:
                break;
        }
        setErrors(prev => ({ ...prev, [id]: error }));
    };

    const updateInputHandler = async () => {
        if (!validateFormEditInput()) {
            await errorUpdateInput();
            return;
        }

        try {
            /**
             * ahora enviamos input.id asegurándonos de que no sea undefined
             * Ejecutamos el enpoint updateInputs enviado los datos del insumo actualizado y su id
             */
            await updateInputs(input.id, {
                name:inputUpdate.name,
                category:inputUpdate.category
            });
            //Alerta de Exito
            await successUpdateInput();
            //Actualiza la lista de Insumos
            onInputUpdated();
            //Cierra el Modal
            onClose();
        } catch (error) {
            console.error('Error al actualizar el insumo', error);
            await errorUpdateInput();
        };
    };

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{ backgroundColor: '#176FA6' }}>
                        <h5 className="modal-title">Editar Insumo</h5> 
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Insumo</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`} 
                                id="name" 
                                value={inputUpdate.name} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Categoria</label>
                            <select 
                                className={`form-control form-control-sm ${errors.category ? 'is-invalid' : ''}`} 
                                id="category"
                                value={inputUpdate.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona una Categoria</option>
                                <option value="liquido">Liquidos</option>
                                <option value="solido_con">Solido Contable</option>
                                <option value="solido_no_con">Solido no Contable</option>
                            </select>
                            {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={updateInputHandler} 
                            style={{ backgroundColor: '#176FA6' }}
                        >
                            Guardar Cambios
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

export default EditInputModal;