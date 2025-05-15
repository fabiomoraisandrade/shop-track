const salesRouter = require("express").Router();
const rescue = require("express-rescue");
const authorizeToken = require("../../middlewares/authorizeToken");
const { CreateSaleController } = require("../../controllers/v1");

salesRouter.post("/", rescue(authorizeToken), rescue(CreateSaleController));

module.exports = salesRouter;
