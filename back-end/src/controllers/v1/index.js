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
const GetAllProductsController = require("./products/GetAllProductsController");
const GetProductByIdController = require("./products/GetProductByIdController");
const UpdateProductController = require("./products/UpdateProductController");
const DeleteProductController = require("./products/DeleteProductController");

// Sale
const CreateSaleController = require("./sales/CreateSaleController");
const GetAllSalesController = require("./sales/GetAllSalesController");

module.exports = {
  CreateUserController,
  CreateUserAdmController,
  GetAllUsersController,
  GetUserByIdController,
  UpdateUserController,
  DeleteUserController,
  LoginUserController,

  CreateProductController,
  GetAllProductsController,
  GetProductByIdController,
  UpdateProductController,
  DeleteProductController,

  CreateSaleController,
  GetAllSalesController,
};
