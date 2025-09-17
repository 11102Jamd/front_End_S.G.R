// importación de la configuración de Axios
import api from "../axiosConfig";

// Función para limpiar precios y convertir a número
export const parseCOP = (value) => {
    if (!value) return 0;
    const clean = value.toString().replace(/[^0-9.]/g, '');
    return parseFloat(clean) || 0;
};

// Función para obtener el listado de ventas desde el backend
export const getSale = async () => {
    try {
        const response = await api.get("/sale");
        return response.data;
    } catch (error) {
        console.error("Error al obtener el listado de ventas", error);
        throw error;        
    }
};

// Función para obtener detalles de una venta por ID
export const getSaleDetails = async (id) => {
    try {
        const response = await api.get(`/sale/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al traer la venta con detalles", error);
        throw error;
    }
};

// Función para crear una venta
export const createSale = async (saleData) => {
    try {
        const response = await api.post("/sale", saleData);
        return response.data;
    } catch (error) {
        console.error("Error al crear la venta", error);
        throw error;        
    }
};

// Función para eliminar una venta por su ID
export const deleteSale = async (id) => {
    try {
        const response = await api.delete(`/sale/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar la venta", error);
        throw error;        
    }
};
