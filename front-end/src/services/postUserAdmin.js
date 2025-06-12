import api from "./API";

const postUserAdmin = async (adminBody) => {
    try {
        const response = await api.post("/api/v1/users/admin", adminBody);

        return response.data;
    } catch (err) {
        console.error(`Erro ao cadastrar usuário administrador: ${err}`);
        return err;
    }
};

export default postUserAdmin;