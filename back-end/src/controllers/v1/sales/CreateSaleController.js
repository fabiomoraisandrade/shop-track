const { StatusCodes } = require("http-status-codes");
const { CreateSaleService } = require("../../../services/v1");

const createSaleController = async (req, res) => {
  const { id } = req.userInfo;
  const { body } = req;

  const sale = await CreateSaleService({ userId: id, ...body });

  return res.status(StatusCodes.CREATED).json(sale);
};

module.exports = createSaleController;
