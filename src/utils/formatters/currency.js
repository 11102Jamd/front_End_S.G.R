export const formatCurrency = (value, decimals = 0) => {
    const formatter = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: decimals,
    });
    return formatter.format(value || 0);
};
