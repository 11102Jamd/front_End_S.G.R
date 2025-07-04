import api from "../api/auth";

export const deleteSuppliers = async (id) => {
    try {
        await api.delete(`/supplier/${id}`);
    } catch (error) {
        console.error("Error al eliminar el proveedor", error);
        throw error;
    }
};