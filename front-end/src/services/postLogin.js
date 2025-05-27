import api from './API';

const postLogin = async (email, password) => {
    try {
        const response = await api.post("/api/v1/login", {
            email,
            password
        });

        return response.data;
    } catch (err) {
        console.error(`Erro ao fazer login: ${err}`);
        return err;
    }
};

export default postLogin;