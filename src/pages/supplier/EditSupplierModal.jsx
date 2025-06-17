import React, { use, useState } from "react";
import api from "../../utils/axiosConfig";
import Swal from "sweetalert2";


function EditSupplierModal({supplier, onClose, onSupplierUpdated}){
    const [supplierUpdate, setSupplierUpdate] = useState(supplier);

    const updateSupplier = async () => {
        try {
            await api.put(`/suppliers/${supplier.id}`, supplierUpdate);
            await Swal.fire('Éxito', 'Proveedor Actualizado', 'success');
            onSupplierUpdated();
            onClose();
        } catch (error) {
            console.error('Error al actualizar el proveedor', error);
            await Swal.fire('¡Error', 'Error al actualizar el proveedor', 'error');
        }
    }

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
                                className="form-control form-control-lg" 
                                id='name'
                                value={supplierUpdate.name} 
                                onChange={(e) => setSupplierUpdate({ ...supplierUpdate, name: e.target.value })} 
                                required 
                            />
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                            <input 
                                type="email" 
                                className="form-control form-control-lg" 
                                id="email" 
                                value={supplierUpdate.email} 
                                onChange={(e) => setSupplierUpdate({ ...supplierUpdate, email: e.target.value })} 
                                required 
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Addres" className="form-label">Direccion</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="Addres" 
                                value={supplierUpdate.Addres} 
                                onChange={(e) => setSupplierUpdate({ ...supplierUpdate, Addres: e.target.value })} 
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Phone" className="form-label">Telefono</label>
                            <input 
                                type="number" 
                                className="form-control form-control-lg" 
                                id="Phone" 
                                value={supplierUpdate.Phone} 
                                onChange={(e) => setSupplierUpdate({ ...supplierUpdate, Phone: e.target.value })} 
                            />
                        </div>
                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" style={{backgroundColor:' #176FA6'}} onClick={updateSupplier}>
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