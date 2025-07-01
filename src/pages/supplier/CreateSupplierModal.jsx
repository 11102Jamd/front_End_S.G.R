import React, { useState } from "react";
import Swal from "sweetalert2";
import api from "../../utils/axiosConfig";
import { validateName ,validateAddress, validateEmail, validatePhone } from "../../utils/validations/validationFields";

function CreateSupplierModal({onClose, onSupplierCreated}){
    const [newSupplier, setNewSupplier] = useState({
        name:'',
        email:'',
        Addres:'',
        Phone:''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {
            name: validateName(newSupplier.name, 'Nombre del proveedor'),
            email: validateEmail(newSupplier.email),
            Addres: validateAddress(newSupplier.Addres),
            Phone: validatePhone(newSupplier.Phone)
        };

        setErrors(newErrors);
        
        // Retorna true si no hay errores (todos los valores son null)
        return !Object.values(newErrors).some(error => error !== null);
    };


    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewSupplier(prev => ({ ...prev, [id]: value }));
        
        // Validación en tiempo real (opcional)
        if (errors[id]) {
            let error = null;
            switch(id) {
                case 'name':
                    error = validateName(value, 'Nombre del proveedor');
                    break;
                case 'email':
                    error = validateEmail(value);
                    break;
                case 'Addres':
                    error = validateAddress(value);
                    break;
                case 'Phone':
                    error = validatePhone(value);
                    break;
                default:
                    break;
            }
            setErrors(prev => ({ ...prev, [id]: error }));
        }
    };


    const createSupplier = async () => {
        if (!validateForm()) {
            // Mostrar error general si hay campos inválidos
            await Swal.fire('¡Error!', 'Por favor corrige los errores en el formulario', 'error');
            return;
        }

        try {
            await api.post('/suppliers', newSupplier);
            await Swal.fire('Éxito', 'Proveedor creado', 'success');
            onSupplierCreated();
            onClose();
            setNewSupplier({
                name:'',
                email:'',
                Addres:'',
                Phone:''
            });
        } catch (error) {
            console.error('Error al crear el proveedor', error);
            await Swal.fire('¡Error!', 'Error al crear el proveedor', 'error');
        }
    }

    return(
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{backgroundColor:' #176FA6'}}>
                        <h5 className="modal-title">Crear Nuevo Proveedor</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Proveedor</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
                                id="name" 
                                value={newSupplier.name} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                            <input 
                                type="email" 
                                className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                                id="email" 
                                value={newSupplier.email} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Addres" className="form-label">Direccion</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-lg ${errors.Addres ? 'is-invalid' : ''}`}
                                id="Addres" 
                                value={newSupplier.Addres} 
                                onChange={handleChange} 
                                required
                            />
                            {errors.Addres && <div className="invalid-feedback">{errors.Addres}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Phone" className="form-label">Telefono</label>
                            <input 
                                type="text"  // Cambiado a text para permitir formatos internacionales
                                className={`form-control form-control-lg ${errors.Phone ? 'is-invalid' : ''}`}
                                id="Phone" 
                                value={newSupplier.Phone} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.Phone && <div className="invalid-feedback">{errors.Phone}</div>}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={createSupplier} style={{backgroundColor:' #176FA6'}}>
                            Guardar Proveedor
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
export default CreateSupplierModal;