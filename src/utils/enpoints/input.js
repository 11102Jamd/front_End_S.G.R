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

export const deleteInputs = async (id) => {
    try {
        const response = await api.delete(`/input/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el insumo", error);
        throw error;
    };
};
