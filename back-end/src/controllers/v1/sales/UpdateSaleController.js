const { StatusCodes } = require("http-status-codes");
const { UpdateSaleService } = require("../../../services/v1");

const updateSaleController = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  await UpdateSaleService(id, body);

  return res.status(StatusCodes.NO_CONTENT).end();
};

module.exports = updateSaleController;
