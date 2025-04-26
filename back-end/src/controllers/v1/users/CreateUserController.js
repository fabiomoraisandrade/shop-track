const { StatusCodes } = require("http-status-codes");
const { CreateUserService } = require("../../../services/v1");

const createUserController = async (req, res, _next) => {
  const { body } = req;

  const newUser = await CreateUserService(body);

  return res.status(StatusCodes.CREATED).json(newUser);
};

module.exports = createUserController;
