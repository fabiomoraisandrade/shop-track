import api from "./API";

const deleteUser = async (userId) => {
    const deletedUser = await api.delete(`/api/v1/users/${userId}`);
    return deletedUser.data;
};

export default deleteUser;