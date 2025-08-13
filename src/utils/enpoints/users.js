import api from "../axiosConfig";

/**
 * Obtiene la lista de usuarios desde la API.
 * @async
 * @function getUsers
 * @returns {Promise<Object[]>} Lista de usuarios obtenida desde el backend.
 * @throws Lanza un error si la petición falla.
 */
export const getUsers = async () => {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (error) {
        console.error("Error al obtener la lista de usuarios: ",error);
        throw error;
    };
};


/**
 * Crea un nuevo usuario en la API.
 * @async
 * @function createUser
 * @param {Object} userData - Datos del usuario a crear.
 * @returns {Promise<Object>} Usuario creado devuelto por la API.
 * @throws Lanza un error si la creación falla.
 */
export const createUser = async (userData) => {
    try {
        const response = await api.post("/users",userData);
        return response.data;
    } catch (error) {
        console.error("Error al crear el Usuario ", error);
        throw error;
    };
};


/**
 * Actualiza un usuario existente en la API.
 * @async
 * @function updateUser
 * @param {number|string} id - ID del usuario a actualizar.
 * @param {Object} userData - Datos actualizados del usuario.
 * @returns {Promise<Object>} Usuario actualizado devuelto por la API.
 * @throws Lanza un error si la actualización falla.
 */
export const updateUser = async (id, userData) => {
    try {
        const response = await api.put(`/users/${id}`,userData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
        throw error;
    };
};


/**
 * Elimina un usuario de la API.
 * @async
 * @function deleteUser
 * @param {number|string} id - ID del usuario a eliminar.
 * @returns {Promise<Object>} Respuesta de la API tras la eliminación.
 * @throws Lanza un error si la eliminación falla.
 */
export const deleteUser = async(id) => {
    try {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el usuario", error);
        throw error;
    };
};