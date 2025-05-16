const { Sale } = require("../../../database/models");
const { notFound } = require("../../../errors/ApiError");

const deleteSaleService = async (id) => {
  const sale = Sale.destroy({ where: { id } });
  if (!sale) return notFound("not found");

  return sale;
};

module.exports = deleteSaleService;
