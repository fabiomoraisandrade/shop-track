import api from './API';

const postUser = async (userBody) => {
    const response = await api.post("/api/v1/users", userBody);
    return response.data;
};

export default postUser;