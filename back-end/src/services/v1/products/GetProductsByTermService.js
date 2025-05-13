const { Op } = require("sequelize");
const { Product } = require("../../../database/models");

const getProductByTermService = async (term) => {
  return Product.findAll({ where: { name: { [Op.iLike]: `%${term}%` } } });
};

module.exports = getProductByTermService;
