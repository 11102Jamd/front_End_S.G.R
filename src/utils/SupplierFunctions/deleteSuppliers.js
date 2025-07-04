import api from "../api/auth";

export const getSupplier = async () => {
    try {
        const response = await api.get('/supplier');
        return response.data;
    } catch (error) {
        console.error("Error al obtener proveedores", error);
        throw error;
    }
}