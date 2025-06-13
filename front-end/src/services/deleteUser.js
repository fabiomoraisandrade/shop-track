import api from "./API";

const deleteUser = async (userId) => {
    try {
        const deletedUser = await api.delete(`/api/v1/users/${id}`);

        return deletedUser.data;
    } catch (err) {
        console.error(`Erro ao deletar usuário: ${err}`);
    }
};

export default deleteUser;