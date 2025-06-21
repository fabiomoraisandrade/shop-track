import api from "./API";

const postSale = async (body) => {
  const result = await api.post("/api/v1/sales", body);
  return result.data;
};

export default postSale;
