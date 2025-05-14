const { Product } = require("../../../database/models");
const { notFound } = require("../../../errors/ApiError");

const deleteProductService = async (id) => {
  const removedProduct = await Product.destroy({ where: { id } });
  if (!removedProduct) return notFound("Product does not exist");

  return removedProduct;
};

module.exports = deleteProductService;
