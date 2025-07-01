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