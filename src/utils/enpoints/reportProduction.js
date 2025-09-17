import api from "../axiosConfig";


/**
 * Generar un PDF de las producciones en un rango de fechas específico.
 * @async
 * @function
 * @param {string} startDate - Fecha de inicio del rango de producciones (formato YYYY-MM-DD).
 * @param {string} endDate - Fecha de fin del rango de producciones (formato YYYY-MM-DD).
 * @returns {Promise<Blob>} Archivo PDF de las producciones generado por la API.
 * @throws Lanza un error si la generación del PDF falla.
 */
export const generatePdfProduction = async (startDate, endDate) => {
    try {
        const response = await api.post("/production/export-pdf", {
            start_date: startDate,
            end_date: endDate
        }, {
            headers: {
                "Content-Type":'application/json'
            },
            responseType:'blob' 
        });
        return response.data;
    } catch (error) {
        console.error("error al obtener el pdf de Producciones", error);
        throw error;        
    };
};