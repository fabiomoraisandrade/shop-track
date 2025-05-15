const mainRoutes = require("express").Router();

const usersV1Router = require("./v1/UserRoutes");
const productsV1Router = require("./v1/ProductRoutes");
const salesV1Router = require("./v1/SaleRoutes");
const loginV1Router = require("./v1/LoginRoutes");

mainRoutes.use("/api/v1/users", usersV1Router);
mainRoutes.use("/api/v1/products", productsV1Router);
mainRoutes.use("/api/v1/sales", salesV1Router);
mainRoutes.use("/api/v1/login", loginV1Router);

module.exports = mainRoutes;
