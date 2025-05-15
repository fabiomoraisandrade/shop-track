const productsRouter = require("express").Router();
const rescue = require("express-rescue");
const authorizeToken = require("../../middlewares/authorizeToken");
const {
  CreateProductController,
  GetAllProductsController,
  GetProductByIdController,
  DeleteProductController,
  UpdateProductController,
} = require("../../controllers/v1");

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
productsRouter.put(
  "/:id",
  rescue(authorizeToken),
  rescue(UpdateProductController),
);
productsRouter.delete(
  "/:id",
  rescue(authorizeToken),
  rescue(DeleteProductController),
);

module.exports = productsRouter;
