// importación de la configuración de Axios
import api from "../axiosConfig";

// Función para obtener el listado de ventas desde el backend
export const getSale = async () => {
    try {
        const response = await api.get("/sale");
        return response.data;
    } catch (error) {
        console.error("error al obetner el listado de ventas",error);
        throw error;        
    };
};
// Importación de SweetAlert2 para mostrar alertas
export const getSaleDetails = async (id) => {
    try {
        const response = await api.get(`/sale/${id}`);
        return response.data;
    } catch (error) {
        console.error("error al traer la venta con detalles", error);
        throw error;
    };
};
// Importación de SweetAlert2 para mostrar alertas
export const createSale = async (saleData) => {
    try {
        const response = await api.post("/sale", saleData);
        return response.data;
    } catch (error) {
        console.error("error al crear la venta", error);
        throw error;        
    };
};
// Función para eliminar una venta por su ID
export const deleteSale = async (id) => {
    try {
        const response = await api.delete(`/sale/${id}`);
        return response.data;
    } catch (error) {
        console.error("error al elimnar la venta",error);
        throw error;        
    };
};