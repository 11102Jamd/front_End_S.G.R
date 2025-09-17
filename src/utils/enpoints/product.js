import api from "../axiosConfig";

/**
 * Obtiene la lista de productos desde la API.
 * @async
 * @function getProduct
 * @returns {Promise<Object[]>} Lista de productos obtenida desde el backend.
 * @throws Lanza un error si la petición falla.
 */
export const getProduct = async  () => {
    try {
        const response = await api.get("/product");
        // return Array.isArray(response.data) ? response.data : [];
        return response.data;
    } catch (error) {
        console.error("Error al obtener la lista de productos", error);
        throw error;
    };
};

/**
 * crea un nuevo producto desde la API.
 * @async
 * @function createProduct
 * @param {Object} productData - Datos del producto a crear
 * @returns {Promise<Object[]>} producto devuelto por la api.
 * @throws Lanza un error si la petición falla.
 */
export const createProduct = async (productData) => {
    try {
        const response = await api.post("/product", productData);
        return response.data;
    } catch (error) {
        console.error("Error al crear el producto", error);
        throw error;
    };
};

/**
 * Actualiza un prducto existente en la API.
 * @async
 * @function updateProduct
 * @param {number|string} id - ID del Producto a actualizar.
 * @param {Object} productData - Datos actualizados del producto.
 * @returns {Promise<Object>} producto actualizado devuelto por la API.
 * @throws Lanza un error si la actualización falla.
 */
export const updateProduct = async (id, productData) => {
    try {
        const response = await api.put(`/product/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error("error al editar el producto", error);
        throw error;
    };
};

/**
 * Inhabilitar un producto de la API.
 * @async
 * @function 
 * @param {number|string} id - ID del producto a inhabilitar.
 * @returns {Promise<Object>} Respuesta de la API tras la inhbailitacion.
 * @throws Lanza un error si la Inhabiliacion falla.
 */
export const disableProduct = async (id) => {
    try {
        const response = await api.patch(`/product/${id}/disable`);
        return response.data;
    } catch (error) {
        console.error("error al inhabilitar el producto", error);
        throw error;        
    }
}

/**
 * Vincular una producción existente con un producto en la API.
 * @async
 * @function
 * @param {number|string} productionId - ID de la producción a vincular.
 * @param {number|string} productId - ID del producto al que se asociará la producción.
 * @returns {Promise<Object>} Respuesta de la API tras la vinculación.
 * @throws Lanza un error si la vinculación falla.
 */
export const linkProductionToProduct = async (productionId,productId) => {
    try {
        const response = await api.post("/products/link-production", {
            production_id: productionId,
            product_id: productId
        });
        return response.data;
    } catch (error) {
        console.error("error al vincular el cproducto con su produccion", error);
        throw error        
    };
};
