const productsRouter = require("express").Router();
const rescue = require("express-rescue");
const {
  CreateProductController,
  GetAllProductsController,
  GetProductByIdController,
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
productsRouter.get(
  "/:id",
  rescue(authorizeToken),
  rescue(GetProductByIdController),
);

module.exports = productsRouter;
