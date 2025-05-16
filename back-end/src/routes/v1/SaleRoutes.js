const salesRouter = require("express").Router();
const rescue = require("express-rescue");
const authorizeToken = require("../../middlewares/authorizeToken");
const {
  CreateSaleController,
  GetAllSalesController,
} = require("../../controllers/v1");

salesRouter.post("/", rescue(authorizeToken), rescue(CreateSaleController));
salesRouter.get("/", rescue(authorizeToken), rescue(GetAllSalesController));

module.exports = salesRouter;
