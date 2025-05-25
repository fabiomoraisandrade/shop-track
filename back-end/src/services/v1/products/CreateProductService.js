const { Product, User } = require("../../../database/models");
const { validateProduct } = require("../../../validators");
const ApiError = require("../../../errors/ApiError");

const { badRequest, conflict, notFound } = ApiError;

const createProductService = async (body) => {
  const error = validateProduct(body);
  if (error) return badRequest(error);

  const product = await Product.findOne({ where: { name: body.name } });
  if (product) return conflict("Product already exists");

  const seller = await User.findByPk(body.sellerId);
  if (!seller) return notFound("Seller not found");

  if (seller.isAdmin)
    return badRequest("User is not allowed to register a product");

  const newProduct = await Product.create({ ...body });

  return newProduct;
};

module.exports = createProductService;
