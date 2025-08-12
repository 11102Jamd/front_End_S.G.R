import api from "../axiosConfig";

export const getProducts = async () => {
    try {
        const response = await api.get("/products");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los productos", error);
        throw error;
    };
};


export const createProduct = async (productData) => {
    try {
        const response = await api.post("/products", productData);
        return response.data;
    } catch (error) {
        console.error("Error al crear el Producto", error);
        throw error;
    };
};


export const updateProduct = async (id, productData) => {
    try {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el producto", error);
        throw error;
    }
};


export const deleteProduct = async (id) => {
    try {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el producto", error);
        throw error;
    };
};