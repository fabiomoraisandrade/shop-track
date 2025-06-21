import api from "./API";

const postProduct = async (name, price, image, sellerId) => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("file", image);
    formData.append("sellerId", sellerId);

    const response = await api.post("/api/v1/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (err) {
    console.error(`Erro ao cadastrar produto: ${err}`);
    return err;
  }
};

export default postProduct;
