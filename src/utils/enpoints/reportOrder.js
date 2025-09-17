import api from "../axiosConfig";


/**
 * Generar un PDF de las compras en un rango de fechas específico.
 * @async
 * @function
 * @param {string} startDate - Fecha de inicio del rango de compras (formato YYYY-MM-DD).
 * @param {string} endDate - Fecha de fin del rango de compras (formato YYYY-MM-DD).
 * @returns {Promise<Blob>} Archivo PDF de las compras generado por la API.
 * @throws Lanza un error si la generación del PDF falla.
 */
export const generatePdfOrder = async (startDate, endDate) => {
    try {
        const response = await api.post("/order/export-pdf", {
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
        console.error("error al generar el pdf de comrpas");
        throw error;        
    };
};