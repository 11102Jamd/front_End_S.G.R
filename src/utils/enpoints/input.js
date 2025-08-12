import api from "../axiosConfig";

export const getInputs = async () => {
    try {
        const response = await api.get("/inputs");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los insumos", error);
        throw error;
    };
};

export const createInputs = async (inputData) => {
    try {
        const response = await api.post("/inputs", inputData);
        return response.data;
    } catch (error) {
        console.error("Error al crear el insumo", error);
        throw error;
    };
};

export const updateInputs = async (id, inputData) => {
    try {
        const response = await api.put(`/inputs/${id}`, inputData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar los datos", error);
        throw error;
    };
};

export const deleteInputs = async (id) => {
    try {
        const response = await api.delete(`/inputs/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el insumo", error);
        throw error;
    };
};