import api from "../axiosConfig";

export const getPurchase = async () => {
    try {
        const response = await api.get('/purchaseorder');
        return  response.data;
    } catch (error) {
        console.error("Error al obtener lista de Compras", error);
    }
}

// export const createPurchase = async (purchaseData) => {
//     try {
//         const response = await api.post('/purchaseorder', purchaseData);
//         return response.data;
//     } catch (error) {
//         console.error("Error al crear la compra", error);
//         throw error;
//     }
// };

// export const updatePurchase = async (id, purchaseData) => {
//     try {
//         const response = await api.put(`/purchaseorder/${id}`, purchaseData);
//         return response.data;
//     } catch (error) {
//         console.error("Error al actualizar la compra", error);
//         throw error;
//     }
// };

export const deletePurchase = async (id) => {
    try {
        const response = await api.delete(`/purchaseorder/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar la compra", error);
        throw error;
    }
};