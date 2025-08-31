import React, { useState } from "react";
import Swal from "sweetalert2";
import { validateName } from "../../utils/validations/validationFields";
import { createInputs } from "../../utils/enpoints/input";
import { errorCreateInput, errorFormInput, successCreateInput } from "../../utils/alerts/alertsInputs";

function CreateInputModal({ onClose, onInputCreated }) {
    const [newInput, setNewInput] = useState({
        InputName: ''
    });

    const [errors, setErrors] = useState({});

    const validateFormInput = () => {
        const newErrors = {
            InputName: validateName(newInput.InputName, 'Nombre del insumo'),
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== null);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewInput(prev => ({ ...prev, [id]: value }));

        // Validación en tiempo real (opcional)
        if (errors[id]) {
            let error = null;
            switch (id) {
                case 'InputName':
                    error = validateName(value, 'Nombre del Insumo');
                    break;
                default:
                    break;
            }
            setErrors(prev => ({ ...prev, [id]: error }));
        }
    };

    const createInputHandler = async () => {
        if (!validateFormInput()) {
            await errorFormInput();
            return;
        }
        try {
            await createInputs(newInput);
            await successCreateInput();
            onInputCreated();
            onClose();
            setNewInput({
                InputName: '',
            });
        } catch (error) {
            console.error('Error al crear el insumo', error);
            await errorCreateInput();
        };
    };

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{ backgroundColor: ' #176FA6' }}>
                        <h5 className="modal-title">Crear Nuevo Insumo</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="InputName" className="form-label">Insumo</label>
                            <input
                                type="text"
                                className={`form-control form-control-lg ${errors.InputName ? 'is-invalid' : ''}`}
                                id="InputName"
                                value={newInput.InputName}
                                onChange={handleChange}
                                required
                            />
                            {errors.InputName && <div className="invalid-feedback">{errors.InputName}</div>}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={createInputHandler} style={{ backgroundColor: ' #176FA6' }}>
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