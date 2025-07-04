import api from "../api/auth";


export const getPurchase = async () => {
    try {
        const response = await api.get('/purchaseorder');
    } catch (error) {
        console.error("Error al obtener lista de Compras", error);
    }
}

