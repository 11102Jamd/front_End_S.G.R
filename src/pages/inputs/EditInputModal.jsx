import React, { useState } from "react";
import { validateName } from "../../utils/validations/validationFields";
import { errorEditInput, errorFormInput, successEditInput } from "../../utils/alerts/alertsInputs";
import { updateInputs } from "../../utils/enpoints/input";

function EditInputModal({input, onClose, onInputUpdated}){
    const [inputUpdate, setInputUpdate] = useState(input);
    const [errors, setErrors] = useState({});

    const validateFormEditInput = () => {
        const newErrors = {
            InputName: validateName(inputUpdate.InputName, 'Nombre del insumo'),
        };

        setErrors(newErrors);
        
        return !Object.values(newErrors).some(error => error !== null);
    };


    const handleChange = (e) => {
        const { id, value } = e.target;
        setInputUpdate(prev => ({ ...prev, [id]: value }));
        
        // Validación en tiempo real (opcional)
        if (errors[id]) {
            let error = null;
            switch(id) {
                case 'InputName':
                    error = validateName(value, 'Nombre del Insumo');
                    break;
                default:
                    break;
            }
            setErrors(prev => ({ ...prev, [id]: error }));
        }
    };

    const updateInputHandler = async () => {
        if (!validateFormEditInput()) {
            await errorFormInput();
            return;
        }

        try {
            await updateInputs(input.id, {
                InputName: inputUpdate.InputName,
            });
            await successEditInput();
            onInputUpdated();
            onClose();
        } catch (error) {
            console.error("Error al actualizar el insumo: ", error);
            await errorEditInput();
        }
    };

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{ backgroundColor: '#176FA6' }}>
                        <h5 className="modal-title">Editar Insumo</h5> {/* Corregido el título */}
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="InputName" className="form-label">Insumo</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-lg ${errors.InputName ? 'is-invalid' : ''}`} 
                                id="InputName" 
                                value={inputUpdate.InputName} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.InputName && <div className="invalid-feedback">{errors.InputName}</div>}
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