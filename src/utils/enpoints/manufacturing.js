import api from "../axiosConfig";

export const getManufacturing = async () => {
    try {
        const response = await api.get('/manufacturing');
        return response.data;
    } catch (error) {
        console.error('Error al obtener la lista de fabricación', error);
        throw error;
    }
};

export const createManufacturing = async (data) => {
    try {
        const response = await api.post("/manufacturing", data);
        return response.data;
    } catch (error) {
        console.error('Error al crear la fabricación', error);
        throw error;
    }
};

export const deleteManufacturing = async (id) => {
    try {
        const response = await api.delete(`/manufacturing/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la fabricación', error);
        throw error;
    }
};
