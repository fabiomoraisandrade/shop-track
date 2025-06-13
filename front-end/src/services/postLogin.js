import api from './API';

const postLogin = async (email, password) => {
  const response = await api.post("/api/v1/login", { email, password });
  return response.data;
};

export default postLogin;