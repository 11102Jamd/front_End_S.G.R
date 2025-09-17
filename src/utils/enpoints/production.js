import api from  "../../utils/axiosConfig";

/**
 * Obtiene la lista de produccion desde la API.
 * @async
 * @function getProduction
 * @returns {Promise<Object[]>} Lista de produccion obtenida desde el backend.
 * @throws Lanza un error si la petición falla.
 */
export const getProduction = async () => {
    try {
        const response = await api.get("/production");
        return response.data;
    } catch (error) {
        console.error("error al obtener las producciones");
        throw error;
    };
};

/**
 * crea un nueva produccion desde la API.
 * @async
 * @function createProduction
 * @param {Object} productionData- Datos de la produccion a crear
 * @returns {Promise<Object[]>} produccion devuelta por la api.
 * @throws Lanza un error si la petición falla.
 */
export const createProduction = async (productionData) => {
    try {
        const response = await api.post("/production", productionData);
        return response.data;
    } catch (error) {
        console.error("error al crear la produccion", error);
        throw error;        
    };
};

/**
 * obtiene una produccion de la API.
 * @async
 * @function 
 * @param {number|string} id - ID de la produccion a obtener.
 * @returns {Promise<Object>} Respuesta de la API.
 * @throws Lanza un error si la Inhabiliacion falla.
 */
export const getProductionDetails = async (id) => {
    try {
        const response = await api.get(`/production/${id}`);
        return response.data;
    } catch (error) {
        console.error("error al obtener el detalle de una produccion ", error);
        throw error;
    };
};

/**
 * elimina una produccion de la API.
 * @async
 * @function 
 * @param {number|string} id - ID de la produccion a eliminar.
 * @returns {Promise<Object>} Respuesta de la API tras la eliminacion.
 * @throws Lanza un error si la Inhabiliacion falla.
 */
export const deleteProduction = async (id) => {
    try {
        const response = await api.delete(`/production/${id}`);
        return response.data;
    } catch (error) {
        console.error("error al eliminar la produccion", error);
        throw error;        
    };
};