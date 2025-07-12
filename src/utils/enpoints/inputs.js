import api from "../axiosConfig";

export const getInputs = async () => {
    try {
        const response = await api.get("/inputs");
        return response.data;
    } catch (error) {
        console.error('Error al obtener la lista de Insumos', error);
        throw error;
    }
}