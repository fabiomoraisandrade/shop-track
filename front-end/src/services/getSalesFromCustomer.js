import api from "./API";

const getSalesFromCustomer = async (customerId, options = {}) => {
  try {
    const result = await api.get("/api/v1/sales", options);

    return result.data.filter((sale) => sale.userId === customerId);
  } catch (err) {
    if (err.name === 'CanceledError') {
      console.log('Requisição cancelada');
    } else {
      console.error(`Erro ao buscar vendas: ${err}`);
    }
    return { error: err.response };
  }
};

export default getSalesFromCustomer;
