const productsRouter = require("express").Router();
const rescue = require("express-rescue");
const { CreateProductController } = require("../../controllers/v1");
const authorizeToken = require("../../middlewares/authorizeToken");

productsRouter.post(
  "/",
  rescue(authorizeToken),
  rescue(CreateProductController),
);

module.exports = productsRouter;
