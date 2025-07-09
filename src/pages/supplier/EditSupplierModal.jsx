import React, { use, useState } from "react";
import api from "../../utils/axiosConfig";
import Swal from "sweetalert2";
import { updateSupplier } from "../../utils/enpoints/supplier";
import { validateAddress, validatePhone, validateEmail, validateName } from "../../utils/validations/validationFields";
import { errorEditSupplier, errorFormSupplier, successEditSupplier } from "../../utils/alerts/alertsSupplier";

function EditSupplierModal({supplier, onClose, onSupplierUpdated}){
    const [supplierUpdate, setSupplierUpdate] = useState(supplier);

    const [errors, setErrors] = useState({});

    const validateFormEditSupplier = () => {
        const newErrors = {
            name: validateName(supplierUpdate.name, 'Nombre del proveedor'),
            email: validateEmail(supplierUpdate.email),
            Addres: validateAddress(supplierUpdate.Addres),
            Phone: validatePhone(supplierUpdate.Phone)
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== null);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setSupplierUpdate(prev => ({ ...prev, [id]: value }));
        
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

    const updateSupplierHandler = async () => {
        if (!validateFormEditSupplier()) {
            await errorFormSupplier();
            return;
        }

        try {
            await updateSupplier(supplier.id, {
                name: supplierUpdate.name,
                email: supplierUpdate.email,
                Addres: supplierUpdate.Addres,
                Phone: supplierUpdate.Phone
            });
            await successEditSupplier();
            onSupplierUpdated();
            onClose();
        } catch (error) {
            console.error("Error al editar el proveedor: ",error);
            await errorEditSupplier();
        }
    };

    return(
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{backgroundColor:' #176FA6'}}>
                        <h5 className="modal-title">Editar Proveedor</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Proveedor</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`} 
                                id='name'
                                value={supplierUpdate.name} 
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
                                value={supplierUpdate.email} 
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
                                value={supplierUpdate.Addres} 
                                onChange={handleChange} 
                            />
                            {errors.Addres && <div className="invalid-feedback">{errors.Addres}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Phone" className="form-label">Telefono</label>
                            <input 
                                type="number" 
                                className={`form-control form-control-lg ${errors.Phone ? 'is-invalid' : ''}`} 
                                id="Phone" 
                                value={supplierUpdate.Phone} 
                                onChange={handleChange} 
                            />
                            {errors.Phone && <div className="invalid-feedback">{errors.Phone}</div>}
                        </div>
                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" style={{backgroundColor:' #176FA6'}} onClick={updateSupplierHandler}>
                            Guardar Cambios
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EditSupplierModal;