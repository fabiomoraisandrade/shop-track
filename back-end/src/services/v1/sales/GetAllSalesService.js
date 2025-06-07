const { Sale, User, Product } = require("../../../database/models");

const getAllSalesService = async () => {
  const sales = await Sale.findAll({
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

  return sales;
};

module.exports = getAllSalesService;
