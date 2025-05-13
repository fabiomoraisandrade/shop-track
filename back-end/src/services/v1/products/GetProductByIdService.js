const { Product } = require("../../../database/models");
const { notFound } = require("../../../errors/ApiError");

const getProductByIdService = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) return notFound("Product does not exist");

  return product;
};

module.exports = getProductByIdService;
