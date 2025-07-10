import api from "../axiosConfig";

export const getUsers = async () => {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (error) {
        console.error("Error al obtener la lista de usuarios: ",error);
        throw error;
    };
};


export const createUser = async (userData) => {
    try {
        const response = await api.post("/users",userData);
        return response.data;
    } catch (error) {
        console.error("Error al crear el Usuario ", error);
        throw error;
    };
};


export const updateUser = async (id, userData) => {
    try {
        const response = await api.put(`/users/${id}`,userData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el usuario", error);
        throw error;
    };
};


export const deleteUser = async(id) => {
    try {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el usuario", error);
        throw error;
    };
};