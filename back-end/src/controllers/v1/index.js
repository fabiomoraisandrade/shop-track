// User
const CreateUserController = require("./users/CreateUserController");
const CreateUserAdmController = require("./users/CreateUserAdmController");
const GetAllUsersController = require("./users/GetAllUsersController");
const GetUserByIdController = require("./users/GetUserByIdController");
const UpdateUserController = require("./users/UpdateUserController");
const DeleteUserController = require("./users/DeleteUserConroller");
const LoginUserController = require("./users/LoginUserController");

// Product
const CreateProductController = require("./products/CreateProductController");

module.exports = {
  CreateUserController,
  CreateUserAdmController,
  GetAllUsersController,
  GetUserByIdController,
  UpdateUserController,
  DeleteUserController,
  LoginUserController,

  CreateProductController,
};
