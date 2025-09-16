import React, { useState } from "react";
import { validateName } from "../../utils/validations/validationFields";
import { errorCreateInput, successCreateInput } from "../../utils/alerts/alertsInputs";
import { createInput } from "../../utils/enpoints/input";

/**
 * Componente modal para crear un nuevo Insumo
 * @param {function} onClose - Cierra el modal
 * @param {function} onProductCreated - Callback para actualizar la lista de Insumos después de crear uno
 */
function CreateInputModal({onClose, onInputCreated}){
    // Estado para almacenar los datos del nuevo Insumo
    const [newInput, setNewInput] = useState({
        name:'',
        category:''
    });

    //Estado para manejar los errores
    const [errors, setErrors] = useState({});

    /**
     * Valida el formulario de edición del Insumo.
     * @returns {boolean} - Retorna `true` si no hay errores, `false` en caso contrario.
     */
    const validateFormInput = () => {
        const newErrors = {
            name: validateName(newInput.name, 'Nombre del insumo'),
            category: !newInput.category ? 'La categoria es requeirda' : null        };

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

        setNewInput(prev => ({ ...prev, [id]: value }));
        
        let error = null;
        switch(id) {
            case 'name':
                error = validateName(value, 'Nombre del Insumo');
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
    const createInputHandler = async () => {
        if (!validateFormInput()) {
            errorCreateInput();
            return;
        }
        try {
            //se ejecuta el enpoint de input pasandole en la solicitud la informacion del formulario
            await createInput(newInput);
            // Alerta de exito
            await successCreateInput();
            //Actauliza la lista de Insumos
            onInputCreated();
            //Cierra el modal
            onClose();
            //Resetea el Formulario
            setNewInput({
                name:'',
                category:''
            });
        } catch (error) {
            console.error('error al crear el inusmo', error);
            await errorCreateInput();
        };
    };

    return(
        <div className="modal fade show" style={{display:'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{backgroundColor:' #176FA6'}}>
                        <h5 className="modal-title">Crear Insumo</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Insumo</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`} 
                                id="name" 
                                value={newInput.name} 
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
                                value={newInput.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona una Categoria</option>
                                <option value="liquido">Liquidos</option>
                                <option value="solido_con">Solidos Contable</option>
                                <option value="solido_no_con">Solidos no Contable</option>
                            </select>
                            {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                        </div>
                    </div>
                    <div className="modal-footer" style={{alignItems:'center'}}>
                        <button type="button" className="btn btn-primary" onClick={createInputHandler} style={{backgroundColor:' #176FA6'}}>
                            Guardar Insumo
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
export default CreateInputModal;