import api from "./API";

const getSalesFromCustomer = async (customerId) => {
    try {
        const result = await api.get("/api/v1/sales");

        return result.data.filter((sale) => sale.serId === customerId);
    } catch (err) {
        console.error(`Erro ao buscar vendas: ${err}`);
        return { error: err.response };
    }
}

export default getSalesFromCustomer;