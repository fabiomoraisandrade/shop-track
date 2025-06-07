const { Product, User } = require("../../../database/models");

const getAllProductsService = async () => {
  return Product.findAll({
    include: [
      {
        model: User,
        as: "seller",
        attributes: ["id", "name"],
      },
    ],
  });
};

module.exports = getAllProductsService;
