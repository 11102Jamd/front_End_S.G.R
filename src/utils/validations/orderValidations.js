import Swal from "sweetalert2";

// Función genérica para mostrar alertas de error de validación
const showValidationError = (message) => {
    // Configuración de la alerta utilizando SweetAlert2
    Swal.fire({
        icon: "error", 
        title: "Validación fallida", 
        text: message, 
        confirmButtonText: "Entendido",
        confirmButtonColor: "#176FA6", 
        width: '350px', // Ancho de la alerta
        background: "#e6edffff", 
        color: "#220900",
        iconColor: '#f41818ff'
    });
};

// Función para validar el nombre del proveedor
export function validateSupplierName(name) {
    // Expresión regular que permite solo letras y espacios
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; 
    if (!name.trim()) { // Verifica si el nombre está vacío
        showValidationError("El nombre del proveedor es obligatorio."); // Muestra mensaje de error
        return false; // Retorna falso si la validación falla
    }
    if (!regex.test(name)) { // Verifica si el nombre contiene caracteres no permitidos
        showValidationError("El nombre del proveedor no puede contener números ni caracteres especiales."); // Muestra mensaje de error
        return false; // Retorna falso si la validación falla
    }
    return true; // Retorna verdadero si todas las validaciones pasan
}

// Función para validar una cantidad
export function validateQuantity(quantity) {
    if (!quantity) { // Verifica si la cantidad está vacía
        showValidationError("La cantidad es obligatoria."); // Muestra mensaje de error
        return false; // Retorna falso si la validación falla
    }
    if (isNaN(quantity)) { // Verifica si la cantidad es un número
        showValidationError("La cantidad debe ser un número."); // Muestra mensaje de error
        return false; // Retorna falso si la validación falla
    }
    if (parseFloat(quantity) < 1) { // Verifica si la cantidad es menor que 1
        showValidationError("La cantidad debe ser mayor o igual a 1."); // Muestra mensaje de error
        return false; // Retorna falso si la validación falla
    }
    if (!Number.isInteger(Number(quantity))) { // Verifica si la cantidad es un número entero
        showValidationError("La cantidad debe ser un número entero."); // Muestra mensaje de error
        return false; // Retorna falso si la validación falla
    }
    return true; // Retorna verdadero si todas las validaciones pasan
}

// Función para validar el precio unitario
export function validateUnitPrice(price) {
    if (!price) { // Verifica si el precio está vacío
        showValidationError("El precio es obligatorio."); // Muestra mensaje de error
        return false; // Retorna falso si la validación falla
    }
    if (isNaN(price)) { // Verifica si el precio es un número
        showValidationError("El precio debe ser un número."); // Muestra mensaje de error
        return false; // Retorna falso si la validación falla
    }
    if (parseFloat(price) < 50) { // Verifica si el precio es menor que 50
        showValidationError("El precio mínimo debe ser de 50 pesos."); // Muestra mensaje de error
        return false; // Retorna falso si la validación falla
    }
    return true; // Retorna verdadero si todas las validaciones pasan
}