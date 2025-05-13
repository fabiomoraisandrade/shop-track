const { StatusCodes } = require("http-status-codes");
const { CreateProductService } = require("../../../services/v1");

const createProductController = async (req, res, _next) => {
  const { body } = req;

  const newProduct = await CreateProductService(body);

  return res.status(StatusCodes.CREATED).json(newProduct);
};

module.exports = createProductController;
