const productsRouter = require("express").Router();
const rescue = require("express-rescue");
const {
  CreateProductController,
  GetAllProductsController,
} = require("../../controllers/v1");
const authorizeToken = require("../../middlewares/authorizeToken");

productsRouter.post(
  "/",
  rescue(authorizeToken),
  rescue(CreateProductController),
);
productsRouter.get(
  "/",
  rescue(authorizeToken),
  rescue(GetAllProductsController),
);

module.exports = productsRouter;
