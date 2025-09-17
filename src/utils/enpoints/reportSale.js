import api from "../axiosConfig";

/**
 * Generar un PDF de las ventas en un rango de fechas específico.
 * @async
 * @function
 * @param {string} startDate - Fecha de inicio del rango de ventas (formato YYYY-MM-DD).
 * @param {string} endDate - Fecha de fin del rango de ventas (formato YYYY-MM-DD).
 * @returns {Promise<Blob>} Archivo PDF de las ventas generado por la API.
 * @throws Lanza un error si la generación del PDF falla.
 */
export const generatePdfSale = async (startDate, endDate) => {
    try {
        const response = await api.post("/sale/export-pdf", {
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
        console.error("error al generar el pdf de ventas", error);
        throw error;        
    };
};