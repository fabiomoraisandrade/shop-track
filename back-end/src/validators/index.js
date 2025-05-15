const validateUser = require("./UserValidator");
const validateProduct = require("./ProductValidator");
const validateLogin = require("./LoginValidator");
const { schemaSales, schemaSalesUpdate } = require("./SaleValidator");

module.exports = {
  validateUser,
  validateProduct,
  validateLogin,
  schemaSales,
  schemaSalesUpdate,
};
