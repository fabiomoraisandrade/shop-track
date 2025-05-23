const salesRouter = require("express").Router();
const rescue = require("express-rescue");
const authorizeToken = require("../../middlewares/authorizeToken");
const {
  CreateSaleController,
  GetAllSalesController,
  GetSaleByIdController,
  UpdateSaleController,
  DeleteSaleController,
} = require("../../controllers/v1");

salesRouter.post("/", rescue(authorizeToken), rescue(CreateSaleController));
salesRouter.get("/", rescue(authorizeToken), rescue(GetAllSalesController));
salesRouter.get("/:id", rescue(authorizeToken), rescue(GetSaleByIdController));
salesRouter.put("/:id", rescue(authorizeToken), rescue(UpdateSaleController));
salesRouter.delete(
  "/:id",
  rescue(authorizeToken),
  rescue(DeleteSaleController),
);

module.exports = salesRouter;
