const { Product } = require("../../../database/models");

const getAllProductsService = async () => {
  return Product.findAll();
};

module.exports = getAllProductsService;
