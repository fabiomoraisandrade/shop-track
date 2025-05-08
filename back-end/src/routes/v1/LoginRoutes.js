const loginRouter = require("express").Router();
const rescue = require("express-rescue");
const { LoginUserController } = require("../../controllers/v1");

loginRouter.post("/", rescue(LoginUserController));

module.exports = loginRouter;
