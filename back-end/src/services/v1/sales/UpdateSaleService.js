const { Sale } = require("../../../database/models");
const { schemaSalesUpdate } = require("../../../validators/SaleValidator");
const { badRequest, notFound } = require("../../../errors/ApiError");

const updateSaleService = async (id, body) => {
  const { status } = body;

  const error = schemaSalesUpdate(status);
  if (error) return badRequest(error);

  let sale = Sale.findByPk(id);
  if (!sale) return notFound("not found");

  sale = await Sale.update({ status }, { where: { id } });

  return sale;
};

module.exports = updateSaleService;
