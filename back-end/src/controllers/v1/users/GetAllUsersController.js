const { StatusCodes } = require("http-status-codes");
const { GetAllUsersService } = require("../../../services/v1");

const getAllUsersController = async (req, res, _next) => {
  const users = await GetAllUsersService();

  return res.status(StatusCodes.OK).json(users);
};

module.exports = getAllUsersController;
