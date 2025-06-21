import api from "./API";

const putSale = async (sale) => {
  try {
    const result = await api.put(`/api/v1/sales/${sale.id}`, sale);

    return result.data;
  } catch (err) {
    console.error(`Erro ao atualizar venda: ${err}`);
    return err;
  }
};

export default putSale;
