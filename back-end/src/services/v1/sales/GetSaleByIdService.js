const { Sale, User, Product } = require("../../../database/models");
const { notFound } = require("../../../errors/ApiError");

const getSaleByIdService = async (id) => {
  const sale = await Sale.findOne({
    where: { id },
    include: [
      { model: User, as: "customer", attributes: ["id", "name"] },
      { model: User, as: "seller", attributes: ["id", "name"] },
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
