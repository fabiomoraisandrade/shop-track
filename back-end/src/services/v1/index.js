// User
const CreateUserService = require("./users/CreateUserService");
const CreateUserAdmService = require("./users/CreateUserAdmService");
const GetAllUsersService = require("./users/GetAllUsersService");
const GetUserByIdService = require("./users/GetUserByIdService");
const UpdateUserService = require("./users/UpdateUserService");
const DeleteUserService = require("./users/DeleteUserService");
const LoginUserService = require("./users/LoginUserService");

// Product
const CreateProductService = require("./products/CreateProductService");

module.exports = {
  CreateUserService,
  CreateUserAdmService,
  GetAllUsersService,
  GetUserByIdService,
  UpdateUserService,
  DeleteUserService,
  LoginUserService,

  CreateProductService,
};
