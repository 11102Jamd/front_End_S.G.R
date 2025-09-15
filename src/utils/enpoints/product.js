import api  from '../axiosConfig';


export const getProduct = async () => {
    try {
        const response = await api.get('/product'); 
        return response.data;
    } catch (error) {
      console.error('Error fetching product:', error); 
        throw error;  
    }
}
export const createProduct = async (productData) => {
    try {
        const response = await api.post("/product", productData);
        return response.data;
    } catch (error) {
        console.error("Error al crear el producto", error);
        throw error;
    }
};

export const updateProduct =  async ( id, productData) => {
    try {
        const response = await api.put(`/product/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error("Error al crear el producto", error);
        throw error;
    };
};
