const usersRouter = require("express").Router();
const rescue = require("express-rescue");
const {
  CreateUserController,
  GetAllUsersController,
  GetUserByIdController,
  UpdateUserController,
  DeleteUserController,
} = require("../../controllers/v1");
const authorizeToken = require("../../middlewares/authorizeToken");

usersRouter.post("/", rescue(CreateUserController));
usersRouter.get("/", rescue(authorizeToken), rescue(GetAllUsersController));
usersRouter.get("/:id", rescue(authorizeToken), rescue(GetUserByIdController));
usersRouter.put("/:id", rescue(authorizeToken), rescue(UpdateUserController));
usersRouter.delete(
  "/:id",
  rescue(authorizeToken),
  rescue(DeleteUserController),
);

module.exports = usersRouter;
