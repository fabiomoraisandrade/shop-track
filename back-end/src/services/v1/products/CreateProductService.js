const { Product } = require("../../../database/models");
const { validateProduct } = require("../../../validators");
const ApiError = require("../../../errors/ApiError");

const { badRequest, conflict } = ApiError;

const createProductService = async (body) => {
  const error = validateProduct(body);
  if (error) return badRequest(error);

  const product = await Product.findOne({ where: { name: body.name } });
  if (product) return conflict("Product already exists");

  const newProduct = await Product.create({ ...body });

  return newProduct;
};

module.exports = createProductService;
