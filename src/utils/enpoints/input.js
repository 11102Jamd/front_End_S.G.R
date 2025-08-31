import api from "../axiosConfig";


export const getInput = async () => {
    try {
        const response = await api.get("/input");
        return response.data;
    } catch (error) {
        console.error("error al obtener la lista de insumos", error);
        throw error;
    }
}
