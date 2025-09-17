import api from "../axiosConfig";

/**
 * Restablecer la contraseña de un usuario registrado en la API.
 * @async
 * @function
 * @param {string} email - Correo electrónico del usuario cuya contraseña se desea cambiar.
 * @param {string} newPassword - Nueva contraseña que se asignará al usuario.
 * @returns {Promise<Object>} Respuesta de la API tras el intento de restablecimiento de contraseña.
 * @throws Lanza un error si el restablecimiento de la contraseña falla (por ejemplo, si el email no existe).
 */
export const resetPassword = async (email, newPassword) => {
    try {
        const response = await api.post("/reset-password", {
            email: email,
            new_password: newPassword,
            new_password_confirmation: newPassword 
        }, {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        throw error;
    }
};