import api from './API';

const postUser = async (name, email, password) => {
    try {
        const response = await api.post("/api/v1/users", {
            name,
            email,
            password,
            isAdmin: false
        });

        return response.data;
    } catch (err) {
        console.error(`Erro ao cadastrar usuário: ${err}`);
        return err;
    }
};

export default postUser;