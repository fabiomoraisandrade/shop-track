const { StatusCodes } = require("http-status-codes");
const { GetAllSalesService } = require("../../../services/v1");

const getAllSalesController = async (req, res) => {
  const result = await GetAllSalesService();

  return res.status(StatusCodes.OK).json(result);
};

module.exports = getAllSalesController;
