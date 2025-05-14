const { StatusCodes } = require("http-status-codes");
const { DeleteProductService } = require("../../../services/v1");

const deleteProductController = async (req, res, _next) => {
  const { id } = req.params;

  await DeleteProductService(id);

  return res.status(StatusCodes.NO_CONTENT).end();
};

module.exports = deleteProductController;
