import React, { useState } from "react";
import api from "../../utils/axiosConfig";
import Swal from "sweetalert2";

function CreateInputModal({onClose, onInputCreated}){
    const [newInput, setNewInput] = useState({
        InputName:''
    });

    const createInput = async() => {
        try {
            await api.post('/inputs',newInput);
            await Swal.fire('Éxito', 'Insumo creado', 'success');
            onInputCreated();
            onClose();
            setNewInput({
                InputName:'',
            });
        } catch (error) {
            console.error('Error al crear el insumo', error);
            await Swal.fire('¡Error!', 'Error al crear el Insumo', 'error');
        }
    }

    return(
        <div className="modal fade show" style={{display:'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">Crear Nuevo Insumo</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="InputName" className="form-label">Insumo</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="InputName" 
                                value={newInput.InputName} 
                                onChange={(e) => setNewInput({ ...newInput, InputName: e.target.value })} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cerrar
                        </button>
                        <button type="button" className="btn btn-primary" onClick={createInput}>
                            Guardar Insumo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CreateInputModal;