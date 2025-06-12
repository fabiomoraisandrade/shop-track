import api from './API';

const postUser = async (userBody) => {
    try {
        const response = await api.post("/api/v1/users", userBody);

        return response.data;
    } catch (err) {
        console.error(`Erro ao cadastrar usuário: ${err}`);
        return err;
    }
};

export default postUser;