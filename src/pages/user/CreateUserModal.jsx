import React, { useState } from "react";
import { createUser } from "../../utils/enpoints/users";
import { validateEmail, validateName } from "../../utils/validations/validationFields";
import { errorCreateUser, errorFormUser, successCreateUser } from "../../utils/alerts/alertsUsers";


function CreateUserModal({onClose, onUserCreated}){
    const [newUser, setNewUser] = useState({
        name1:'',
        name2:'',
        surname1:'',
        surname2:'',
        email:'',
        password:'',
        rol:''
    });

    const [errors, setErrors] = useState({});

    const validateUserForm = () => {
        const newErrors = {
            name1: validateName(newUser.name1, 'Primer Nombre del Usuario'),
            name2: validateName(newUser.name2, 'Segundo Nombre del Usuario'),
            surname1: validateName(newUser.surname1, 'Primer Apellido del usuario'),
            surname2: validateName(newUser.surname2, 'Segundo apellido del Usuario'),
            email: validateEmail(newUser.email),
            rol: !newUser.rol ? 'Debe seleccionar un rol' : null
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== null);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewUser(prev => ({ ...prev, [id]: value }));
        
        // Validación en tiempo real (opcional)
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

    const createUserHandler = async () => {
        if (!validateUserForm()) {
            await errorFormUser();
            return;
        }
        try {
            await createUser(newUser);
            await successCreateUser();
            onUserCreated();
            onClose();
            setNewUser({
                name1:'',
                name2:'',
                surname1:'',
                surname2:'',
                email:'',
                password:'',
                rol:''
            });
        } catch (error) {
            console.error("Error al crear el usuario: ",error);
            await errorCreateUser();
        };
    };


    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header text-white" style={{backgroundColor:' #176FA6'}}>
                        <h5 className="modal-title">Crear Nuevo Usuario</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="name1" className="form-label">Primer Nombre</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-lg ${errors.name1 ? 'is-invalid' : ''}`} 
                                id="name1" 
                                value={newUser.name1} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.name1 && <div className="invalid-feedback">{errors.name1}</div>}
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="name2" className="form-label">Segundo Nombre</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-lg ${errors.name2 ? 'is-invalid' : ''}`} 
                                id="name2" 
                                value={newUser.name2} 
                                onChange={handleChange} 
                            />
                            {errors.name2 && <div className="invalid-feedback">{errors.name2}</div>}
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="surname1" className="form-label">Primer Apellido</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-lg ${errors.surname1 ? 'is-invalid' : ''}`} 
                                id="surname1" 
                                value={newUser.surname1} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.surname1 && <div className="invalid-feedback">{errors.surname1}</div>}
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="surname2" className="form-label">Segundo Apellido</label>
                            <input 
                                type="text" 
                                className={`form-control form-control-lg ${errors.surname2 ? 'is-invalid' : ''}`} 
                                id="surname2" 
                                value={newUser.surname2} 
                                onChange={handleChange} 
                            />
                            {errors.surname2 && <div className="invalid-feedback">{errors.surname2}</div>}
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                            <input 
                                type="email" 
                                className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                                id="email" 
                                value={newUser.email} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input 
                                type="password" 
                                className="form-control form-control-lg" 
                                id="password" 
                                value={newUser.password} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="rol" className="form-label">Rol</label>
                            <select 
                                className={`form-control form-control-lg ${errors.rol ? 'is-invalid' : ''}`} 
                                id="rol" 
                                value={newUser.rol} 
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
                        <button type="button" className="btn btn-primary" onClick={createUserHandler} style={{backgroundColor:' #176FA6'}}>
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
export default CreateUserModal;