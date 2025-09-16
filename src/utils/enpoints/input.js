import api from "../axiosConfig";

export const getInputs = async () => {
    try {
        const response = await api.get("/input");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los insumos", error);
        throw error;
    };
};

export const createInput = async (inputData) => {
    try {
        const response = await api.post("/input", inputData);
        return response.data;
    } catch (error) {
        console.error("error al obtener la lista de insumos", error);
        throw error;
    };
};

export const updateInputs = async (id, inputData) => {
    try {
        const response = await api.put(`/input/${id}`, inputData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar los datos", error);
        throw error;
    };
};

/**
 * Inhabilitar un insumo de la API.
 * @async
 * @function 
 * @param {number|string} id - ID del insumo a inhabilitar.
 * @returns {Promise<Object>} Respuesta de la API tras la inhbailitacion.
 * @throws Lanza un error si la Inhabiliacion falla.
 */
export const disableInput = async (id) => {
    try {
        const response = await api.patch(`/input/${id}/disable`);
        return response.data;
    } catch (error) {
        console.error("error al inhabilitar el insumo", error);
        throw error;        
    };
};