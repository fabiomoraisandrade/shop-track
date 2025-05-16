const { StatusCodes } = require("http-status-codes");
const { GetSaleByIdService } = require("../../../services/v1");

const getSaleByIdController = async (req, res) => {
  const { id } = req.params;

  const sale = await GetSaleByIdService(id);

  return res.status(StatusCodes.OK).json(sale);
};

module.exports = getSaleByIdController;
