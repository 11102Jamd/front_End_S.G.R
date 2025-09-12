import Swal from "sweetalert2";

// Función genérica para mostrar la alerta de validación
const showValidationError = (message) => {
    Swal.fire({
        icon: "error",
        title: "Validación fallida",
        text: message,
        confirmButtonText: "Entendido",
        confirmButtonColor: "#176FA6",
        width :'350px',
        background:"#e6edffff",
        color:"#220900",
        iconColor: '#f41818ff'
    });
};

// Nombre del proveedor
export function validateSupplierName(name) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Solo letras y espacios
    if (!name.trim()) {
        showValidationError("El nombre del proveedor es obligatorio.");
        return false;
    }
    if (!regex.test(name)) {
        showValidationError("El nombre del proveedor no puede contener números ni caracteres especiales.");
        return false;
    }
    return true;
}

// Validación de la cantidad
export function validateQuantity(quantity) {
    if (!quantity) {
        showValidationError("La cantidad es obligatoria.");
        return false;
    }
    if (isNaN(quantity)) {
        showValidationError("La cantidad debe ser un número.");
        return false;
    }
    if (parseFloat(quantity) < 1) {
        showValidationError("La cantidad debe ser mayor o igual a 1.");
        return false;
    }
    if (!Number.isInteger(Number(quantity))) {
        showValidationError("La cantidad debe ser un número entero.");
        return false;
    }
    return true;
}

//Para validar que sea un numero y mayor a 50
export function validateUnitPrice(price) {
    if (!price) {
        showValidationError("El precio es obligatorio.");
        return false;
    }
    if (isNaN(price)) {
        showValidationError("El precio debe ser un número.");
        return false;
    }
    if (parseFloat(price) < 50) {
        showValidationError("El precio mínimo debe ser de 50 pesos.");
        return false;
    }
    return true;
}
