const { StatusCodes } = require("http-status-codes");
const { GetProductByIdService } = require("../../../services/v1");

const getProductByIdController = async (req, res, _next) => {
  const { id } = req.params;

  const product = await GetProductByIdService(id);

  return res.status(StatusCodes.OK).json(product);
};

module.exports = getProductByIdController;
