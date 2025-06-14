const { Op } = require("sequelize");
const { Product } = require("../../../database/models");

const getProductByTermService = async (term) => {
  const dialect = process.env.DIALECT;

  const whereClause = {
    name: {
      [dialect === "postgres" ? Op.iLike : Op.like]: `%${term}%`,
    },
  };

  return Product.findAll({ where: whereClause });
};

module.exports = getProductByTermService;
