import api from "../../utils/axiosConfig";

/**
 * Obtiene la lista de recetas desde la API.
 * @async
 * @function getRecipe
 * @returns {Promise<Object[]>} Lista de recetas obtenida desde el backend.
 * @throws Lanza un error si la petición falla.
 */
export const getRecipe = async () => {
    try {
        const response = await api.get("/recipe");
        return response.data;
    } catch (error) {
        console.error("error al obtener lalista de recetas", error);
        throw error;
    };
};

/**
 * crea un nueva recetas desde la API.
 * @async
 * @function createRecipe
 * @param {Object} recipeData - Datos del recetas a crear
 * @returns {Promise<Object[]>} recetas devuelto por la api.
 * @throws Lanza un error si la petición falla.
 */
export const createRecipe = async (recipeData) => {
    try {
        const response = await api.post("/recipe", recipeData);
        return response.data;
    } catch (error) {
        console.error("error al crear la receta", error);
        throw error;
    };
};

/**
 * obtiene una recetas de la API.
 * @async
 * @function 
 * @param {number|string} id - ID de la recetas a inhabilitar.
 * @returns {Promise<Object>} Respuesta de la API tras la inhbailitacion.
 * @throws Lanza un error si la Inhabiliacion falla.
 */
export const getRecipeDetails = async (id) => {
    try {
        const response = await api.get(`/recipe/${id}`);
        return response.data;
    } catch (error) {
        console.error("error al obtener los detalles con la receta", error);
        throw error;
    };
};

/**
 * Actualiza una receta existente en la API.
 * @async
 * @function updateRecipe
 * @param {number|string} id - ID del recetas a actualizar.
 * @param {Object} recipeData - Datos actualizados de la receta.
 * @returns {Promise<Object>} receta actualizada devuelto por la API.
 * @throws Lanza un error si la actualización falla.
 */
export const updateRecipe = async (id, recipeData) => {
    try {
        const response = await api.put(`/recipe/${id}`, recipeData);
        return response.data;
    } catch (error) {
        console.error("error al editar la receta", error);
        throw error;
    };
};

/**
 * Inhabilitar una receta de la API.
 * @async
 * @function 
 * @param {number|string} id - ID de la receta a inhabilitar.
 * @returns {Promise<Object>} Respuesta de la API tras la inhbailitacion.
 * @throws Lanza un error si la Inhabiliacion falla.
 */
export const deleteRecipe = async (id) => {
    try {
        const response = await api.delete(`/recipe/${id}`);
        return response.data;
    } catch (error) {
        console.error("error al eliminar la receta", error);
        throw error;
    }
};