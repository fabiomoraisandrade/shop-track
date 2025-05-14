const { StatusCodes } = require("http-status-codes");
const { UpdateProductService } = require("../../../services/v1");

const updateProductController = async (req, res, _next) => {
  const { id } = req.params;
  const { body } = req;

  await UpdateProductService(id, body);

  return res.status(StatusCodes.NO_CONTENT).end();
};

module.exports = updateProductController;
