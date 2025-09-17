import api from "../axiosConfig";

// Función para limpiar precios/costos y convertir a número
export const parseCOP = (value) => {
    if (!value) return 0;
    const clean = value.toString().replace(/[^0-9.]/g, '');
    return parseFloat(clean) || 0;
};

// Obtener todos los productos
export const getProducts = async () => {  // CORRECCIÓN: ahora es plural
    const response = await api.get('/product');
    return response.data;
};

// Eliminar producto
export const deleteProduct = async (productId) => {
    const response = await api.delete(`/product/${productId}`);
    return response.data;
};

// Crear un producto
export const createProduct = async (productData) => {
    try {
        const response = await api.post("/product", productData);
        return response.data;
    } catch (error) {
        console.error("Error al crear el producto:", error);
        throw error;
    }
};

// Actualizar un producto
export const updateProduct = async (id, productData) => {
    try {
        const response = await api.put(`/product/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        throw error;
    }
};

// Inhabilitar un producto
export const disableProduct = async (id) => {
    try {
        const response = await api.patch(`/product/${id}/disable`);
        return response.data;
    } catch (error) {
        console.error("Error al inhabilitar el producto:", error);
        throw error;
    }
};

// Obtener todos los productos inhabilitados
export const getDisabledProducts = async () => {
    try {
        const response = await api.get("/product/disabled");
        return response.data;
    } catch (error) {
        console.error("Error al obtener productos inhabilitados:", error);
        throw error;
    }
};

// Habilitar un producto
export const enableProduct = async (id) => {
    try {
        const response = await api.patch(`/product/${id}/enable`);
        return response.data;
    } catch (error) {
        console.error("Error al habilitar el producto:", error);
        throw error;
    }
};
