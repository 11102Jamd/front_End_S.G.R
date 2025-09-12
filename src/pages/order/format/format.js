export const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString("es-CO", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};


