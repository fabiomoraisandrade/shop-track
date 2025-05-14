const { Product } = require("../../../database/models");
const { validateProduct } = require("../../../validators");
const { badRequest, notFound } = require("../../../errors/ApiError");

const updateProductService = async (id, body) => {
  const error = validateProduct(body);
  if (error) return badRequest(error);

  let product = await Product.findByPk(id);
  if (!product) return notFound("Product does not exist");

  product = await Product.update({ ...body }, { where: { id } });

  return product;
};

module.exports = updateProductService;
