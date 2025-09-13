//Formatea un valor numérico como una cadena de texto
export const formatCurrency = (value) => {
    //Convierte el valor a un número
    return Number(value || 0).toLocaleString("es-CO", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};


