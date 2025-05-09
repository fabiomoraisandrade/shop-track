// User
const CreateUserController = require("./users/CreateUserController");
const GetAllUsersController = require("./users/GetAllUsersController");
const GetUserByIdController = require("./users/GetUserByIdController");
const DeleteUserController = require("./users/DeleteUserConroller");
const LoginUserController = require("./users/LoginUserController");

module.exports = {
  CreateUserController,
  GetAllUsersController,
  GetUserByIdController,
  DeleteUserController,
  LoginUserController,
};
