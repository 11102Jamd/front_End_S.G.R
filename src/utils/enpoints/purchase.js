import api from "../axiosConfig";

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

export const deleteOrder = async (id) => {
    try {
        const response = await api.delete(`/order/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar la compra", error);
        throw error;
    }
};


export const showOrder = async (id) => {
    try {
        const response = await api.get(`/order/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al traer las ordenes de compra", error);
        throw error;
    }
}