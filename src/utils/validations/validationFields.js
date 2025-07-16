export const validateName = (value, fieldName = 'Este campo') => {
    if (!value.trim()) return `${fieldName} es requerido`;
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-.,'()&]+$/.test(value)) {
        return `${fieldName} contiene caracteres no válidos`;
    }
    return null;
};

export const validateEmail = (value) => {
    if (!value.trim()) return 'El email es requerido';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email no válido';
    return null;
};

export const validateAddress = (value) => {
    if (!value.trim()) return 'La dirección es requerida';
    if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\-.,#°()&/]+$/.test(value)) {
        return 'La dirección contiene caracteres no válidos';
    }
    return null;
};

export const validatePhone = (value) => {
    if (!value) return 'El teléfono es requerido';
    if (!/^[\d\s+()\-]{7,20}$/.test(value)) {
        return 'Teléfono no válido (solo números, espacios, +, - y paréntesis)';
    }
    return null;
};


export const validateQuantity = (value) => {
    if (!value) return 'La cantidad es requerida';

    if (!/^[0-9]{1,5}$/.test(value)) {
        return 'Solo se permiten números enteros del 0 al 9, sin espacios ni símbolos, máximo 5 dígitos';
    }

    return null;
};


export const validatePrice = (value) => {
    if (!value) return 'El precio es requerido';

    if (!/^[0-9]{1,5}(,[0-9]{1,2})?$/.test(value)) {
        return 'Formato inválido. Solo se permiten números y una coma, máximo 7 caracteres en total';
    }
    
    return null;
};