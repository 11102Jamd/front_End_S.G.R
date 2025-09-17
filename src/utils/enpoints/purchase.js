import api from "../axiosConfig";

/**
 * Obtiene la lista de compra desde la API.
 * @async
 * @function getOrder
 * @returns {Promise<Object[]>} Lista de compra obtenida desde el backend.
 * @throws Lanza un error si la petición falla.
 */
export const getOrder = async () => {
    try {
        const response = await api.get("/order");
        return response.data;
    } catch (error) {
        console.error("Error al obtener lista de Compras", error);
    }
}

export const createOrder = async (orderData) => {
    try {
        const response = await api.post('/order', orderData);
        return response.data;
    } catch (error) {
        console.error("Error al crear la compra", error);
        throw error;
    }
};

/**
 * elimina una receta de la API.
 * @async
 * @function 
 * @param {number|string} id - ID de la receta a eliminar.
 * @returns {Promise<Object>} Respuesta de la API tras la eliminacion.
 * @throws Lanza un error si la Inhabiliacion falla.
 */
export const deleteOrder = async (id) => {
    try {
        const response = await api.delete(`/order/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar la compra", error);
        throw error;
    }
};

/**
 * obtiene una compra de la API.
 * @async
 * @function 
 * @param {number|string} id - ID de la compra a obtener.
 * @returns {Promise<Object>} Respuesta de la API.
 * @throws Lanza un error si la Inhabiliacion falla.
 */
export const showOrder = async (id) => {
    try {
        const response = await api.get(`/order/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al traer las ordenes de compra", error);
        throw error;
    }
}