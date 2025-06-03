import api from './API';

const getUsers = async () => {
  try {
    const result = await api.get('/api/v1/users');

    return result.data;
  } catch (err) {
    console.log({ error: err });
    return { error: err.response };
  }
};

export default getUsers;