import api from "./API";

const getSalesFromSeller = async (sellerId) => {
    try {
        const result = await api.get("/api/v1/sales");

        return result.data.filter((sale) => sale.sellerId === sellerId);
    } catch (err) {
        console.error(`Erro ao buscar vendas pelo vendedor: ${err}`);
        return { error: err.response };
    }
}

export default getSalesFromSeller;