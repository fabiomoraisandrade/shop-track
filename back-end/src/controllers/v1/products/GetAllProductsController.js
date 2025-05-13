const { StatusCodes } = require("http-status-codes");
const {
  GetAllProductsService,
  GetProductByTermService,
} = require("../../../services/v1");

const getAllProductsController = async (req, res, _next) => {
  let products;
  if (req.query.q) {
    products = await GetProductByTermService(req.query.q);

    return res.status(StatusCodes.OK).json(products);
  }

  products = await GetAllProductsService();

  return res.status(StatusCodes.OK).json(products);
};

module.exports = getAllProductsController;
