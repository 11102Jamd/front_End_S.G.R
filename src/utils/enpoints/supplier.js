import api from "../axiosConfig";

export const getSuppliers = async () => {
    try {
        const response = await api.get("/supplier");
        return response.data;
    } catch (error) {
        console.error('Error al obtener la lista de Proveedores', error);
        throw error;
    };
};

export const createSupplier = async (supplierData) => {
    try {
        const response = await api.post("/supplier", supplierData);
        return response.data;
    } catch (error) {
        console.error('Error al crear el proveedor', error);
        throw error;
    };
};


export const updateSupplier = async (id, supplierData) => {
    try {
        const response = await api.put(`/supplier/${id}`, supplierData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el proveedor', error);
        throw error;
    };
};


export const deleteSupplier = async (id) => {
    try {
        const response = await api.delete(`/supplier/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el proveeedor', error);
        throw error;
    }
};



