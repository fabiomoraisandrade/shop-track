import api from "./API";

const postSale = async (body) => {
    try {
        const result = await api.post("/api/v1/sales", body);

        return result.data;
    } catch (err) {
        console.error(`Erro ao criar venda ${err}`);
        return {error: err}
    }
}

export default postSale;