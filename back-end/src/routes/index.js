const mainRoutes = require("express").Router();

const usersV1Router = require("./v1/UserRoutes");

mainRoutes.use("/api/v1/users", usersV1Router);

module.exports = mainRoutes;
