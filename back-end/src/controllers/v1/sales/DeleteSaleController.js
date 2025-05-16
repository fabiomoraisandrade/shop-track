const { StatusCodes } = require("http-status-codes");
const { DeleteSaleService } = require("../../../services/v1");

const deleteSaleController = async (req, res) => {
  const { id } = req.params;

  await DeleteSaleService(id);

  return res.status(StatusCodes.NO_CONTENT).end();
};

module.exports = deleteSaleController;
