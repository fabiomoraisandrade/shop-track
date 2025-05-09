const { StatusCodes } = require("http-status-codes");
const { LoginUserService } = require("../../../services/v1");

const loginUserController = async (req, res, _next) => {
  const { body } = req;

  const token = await LoginUserService(body);

  return res.status(StatusCodes.OK).json(token);
};

module.exports = loginUserController;
