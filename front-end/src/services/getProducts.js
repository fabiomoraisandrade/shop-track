import api from "./API";

const getProducts = async () => {
  try {
    const result = await api.get("/api/v1/products");

    return result.data;
  } catch (err) {
    console.error(`Erro ao buscar produtos: ${err}`);
  }
};

export default getProducts;
