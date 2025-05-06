const loginRouter = require("express").Router();
const rescue = require("express-rescue");
const { loginUserController } = require("../../controllers/v1");

loginRouter.post("/", rescue(loginUserController));

module.exports = loginRouter;
