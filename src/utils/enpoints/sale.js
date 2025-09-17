// importación de la configuración de Axios
import api from "../axiosConfig";

// Función para obtener el listado de ventas desde el backend
/**
 * Obtiene la lista de venta desde la API.
 * @async
 * @function getSale
 * @returns {Promise<Object[]>} Lista de venta obtenida desde el backend.
 * @throws Lanza un error si la petición falla.
 */
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
/**
 * obtiene una venta de la API.
 * @async
 * @function 
 * @param {number|string} id - ID de la venta a obtener.
 * @returns {Promise<Object>} Respuesta de la API.
 * @throws Lanza un error si la Inhabiliacion falla.
 */
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
/**
 * crea un nueva venta desde la API.
 * @async
 * @function createSale
 * @param {Object} saleData - Datos de la venta a crear
 * @returns {Promise<Object[]>} venta devuelta por la api.
 * @throws Lanza un error si la petición falla.
 */
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
/**
 * elimina una venta de la API.
 * @async
 * @function 
 * @param {number|string} id - ID de la venta a eliminar.
 * @returns {Promise<Object>} Respuesta de la API tras la eliminacion.
 * @throws Lanza un error si la Inhabiliacion falla.
 */
export const deleteSale = async (id) => {
    try {
        const response = await api.delete(`/sale/${id}`);
        return response.data;
    } catch (error) {
        console.error("error al elimnar la venta",error);
        throw error;        
    };
};