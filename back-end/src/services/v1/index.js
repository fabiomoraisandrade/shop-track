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
const GetAllProductsService = require("./products/GetAllProductsService");
const GetProductByTermService = require("./products/GetProductsByTermService");
const GetProductByIdService = require("./products/GetProductByIdService");
const UpdateProductService = require("./products/UpdateProductService");
const DeleteProductService = require("./products/DeleteProductService");

// Sale
const CreateSaleService = require("./sales/CreateSaleService");
const GetAllSalesService = require("./sales/GetAllSalesService");

module.exports = {
  CreateUserService,
  CreateUserAdmService,
  GetAllUsersService,
  GetUserByIdService,
  UpdateUserService,
  DeleteUserService,
  LoginUserService,

  CreateProductService,
  GetAllProductsService,
  GetProductByTermService,
  GetProductByIdService,
  UpdateProductService,
  DeleteProductService,

  CreateSaleService,
  GetAllSalesService,
};
