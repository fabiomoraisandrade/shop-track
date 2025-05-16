const { Sale, User, Product } = require("../../../database/models");
const { notFound } = require("../../../errors/ApiError");

const getSaleByIdService = async (id) => {
  const sale = await Sale.findOne({
    where: { id },
    include: [
      { model: User, as: "customer" },
      { model: User, as: "seller" },
      {
        model: Product,
        as: "products",
        through: { attributes: ["quantity"], as: "orderInfo" },
      },
    ],
  });

  if (!sale) return notFound("not found");

  return sale;
};

module.exports = getSaleByIdService;
