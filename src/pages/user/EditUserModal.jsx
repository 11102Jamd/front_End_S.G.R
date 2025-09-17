import React, { useState } from "react";
import { errorUpdateUser, successUpdateUser } from "../../utils/alerts/alertsUsers";
import { updateUser } from "../../utils/enpoints/users";
import { validateName, validateEmail } from "../../utils/validations/validationFields";

/**
 * Componente modal para editar un usuario existente.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.user - Datos actuales del usuario a editar.
 * @param {Function} props.onClose - Función para cerrar el modal.
 * @param {Function} props.onUserUpdated - Función para recargar la lista de usuarios tras la actualización.
 */
function EditUserModal({user, onClose, onUserUpdated}){
    // Estado para almacenar los datos actualizados del usuario
    const [userUpdate, setUserUpdate] = useState(user);

    // Estado para manejar los errores
    const [errors, setErrors] = useState({});

    /**
     * Valida el formulario de edición del usuario.
     * @returns {boolean} - Retorna `true` si no hay errores, `false` en caso contrario.
     */
    const validateUserEditForm = () => {
        const newErrors = {
            name1: validateName(userUpdate.name1, 'Primer Nombre del Usuario'),
            name2: validateName(userUpdate.name2, 'Segundo Nombre del Usuario'),
            surname1: validateName(userUpdate.surname1, 'Primer Apellido del usuario'),
            surname2: validateName(userUpdate.surname2, 'Segundo apellido del Usuario'),
            email: validateEmail(userUpdate.email),
            rol: !userUpdate.rol ? 'Debe seleccionar un rol' : null
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== null);
    };

    /**
     * Maneja cambios en los campos del formulario.
     * @param {React.ChangeEvent<HTMLInputElement|HTMLSelectElement>} e - Evento del input.
     */
    const handleChange = (e) => {

        // Revalida el campo modificado si ya tenía errores
        const { id, value } = e.target;

        setUserUpdate(prev => ({ ...prev, [id]: value }));
        
        if (errors[id]) {
            let error = null;
            switch(id) {
                case 'name1':
                    error = validateName(value, 'Primer Nombre del Usuario');
                    break;
                case 'name2':
                    error = validateName(value, 'Segundo Nombre del Usuario');
                    break;
                case 'surname1':
                    error = validateName(value, 'Primer Apellido del usuario');
                    break;
                case 'surname1':
                    error = validateName(value, 'Segundo Apellido del usuario');
                    break;
                case 'email':
                    error = validateEmail(value);
                    break;
                case 'rol':
                    error = value ? null: 'Debe seleccionar un rol';
                    break;
                default:
                    break;
            }
            setErrors(prev => ({ ...prev, [id]: error }));
        };
    };

    /**
     * Envía los datos actualizados al servidor y maneja la respuesta.
     */
    const updateUserHandler = async () => {
        if (!validateUserEditForm()) {
            return;
        }

        try {
            await updateUser(user.id, {
                name1: userUpdate.name1,
                name2: userUpdate.name2,
                surname1: userUpdate.surname1,
                surname2: userUpdate.surname2,
                email: userUpdate.email,
                rol: userUpdate.rol
            });
            await successUpdateUser();
            onUserUpdated();
            onClose();
        } catch (error) {
            console.error("Error al actualizar el usuario: ",error);
            await errorUpdateUser();
        };
    };

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{backgroundColor:' #176FA6'}}>
                        <h5 className="modal-title">Editar Usuario</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {/*Campo de primer Nombre */}
                        <div className="mb-3">
                            <label htmlFor="name1" className="form-label">Primer Nombre</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-lg ${errors.name1 ? 'is-invalid' : ''}`} 
                                id="name1" 
                                value={userUpdate.name1} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.name1 && <div className="invalid-feedback">{errors.name1}</div>}
                        </div>
                        
                        {/*Campo de Segundo Nombre */}
                        <div className="mb-3">
                            <label htmlFor="name2" className="form-label">Segundo Nombre</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-lg ${errors.name2 ? 'is-invalid' : ''}`} 
                                id="name2" 
                                value={userUpdate.name2} 
                                onChange={handleChange} 
                            />
                            {errors.name2 && <div className="invalid-feedback">{errors.name2}</div>}
                        </div>
                        
                        {/*Campo de primer apellido */}
                        <div className="mb-3">
                            <label htmlFor="surname1" className="form-label">Primer Apellido</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-lg ${errors.surname1 ? 'is-invalid' : ''}`} 
                                id="surname1" 
                                value={userUpdate.surname1} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.surname1 && <div className="invalid-feedback">{errors.surname1}</div>}
                        </div>
                        
                        {/*Campo de segundo apellido*/}
                        <div className="mb-3">
                            <label htmlFor="surname2" className="form-label">Segundo Apellido</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-lg ${errors.surname2 ? 'is-invalid' : ''}`} 
                                id="surname2" 
                                value={userUpdate.surname2} 
                                onChange={handleChange} 
                            />
                            {errors.surname2 && <div className="invalid-feedback">{errors.surname2}</div>}
                        </div>
                        
                        {/*Campo de correo */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                            <input 
                                type="email" 
                                className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                                id="email" 
                                value={userUpdate.email} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        
                        {/*Option de rol */}
                        <div className="mb-4">
                            <label htmlFor="rol" className="form-label">Rol</label>
                            <select 
                                className={`form-control form-control-lg ${errors.rol ? 'is-invalid' : ''}`} 
                                id="rol" 
                                value={userUpdate.rol} 
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona un rol</option>
                                <option value="Administrador">Administrador</option>
                                <option value="Panadero">Panadero</option>
                                <option value="Cajero">Cajero</option>
                            </select>
                            {errors.rol && <div className="invalid-feedback">{errors.rol}</div>}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={updateUserHandler} style={{backgroundColor:' #176FA6'}}>
                            Guardar Usuario
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

export default EditUserModal;