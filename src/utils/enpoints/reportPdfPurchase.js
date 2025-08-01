import api from "../axiosConfig";


export const exportPdfReportPurchase = async (pdfReportPurchase) => {
    try {
        const response = await api.post('purchase/exportPdf', pdfReportPurchase, {
            responseType: 'blob', // Para recibir el PDF
            headers: {
                'Content-Type': 'application/json', // Asegura que se envíe como JSON
                'Accept': 'application/pdf' // Espera un PDF como respuesta
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error al descargar el PDF", error);
        if (error.response && error.response.data instanceof Blob) {
            try {
                const errorData = await error.response.data.text();
                const parsedError = JSON.parse(errorData);
                throw new Error(parsedError.error || 'Error al generar el PDF');
            } catch (e) {
                throw new Error('Error al procesar la respuesta del servidor');
            }
        }
        throw error;
    };
};