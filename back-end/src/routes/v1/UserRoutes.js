const usersRouter = require("express").Router();
const rescue = require("express-rescue");
const { createUserController } = require("../../controllers/v1");

usersRouter.post("/", rescue(createUserController));

module.exports = usersRouter;
