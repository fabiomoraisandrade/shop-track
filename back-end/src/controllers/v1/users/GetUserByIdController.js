const { StatusCodes } = require("http-status-codes");
const { GetUserByIdService } = require("../../../services/v1");

const getUserByIdController = async (req, res, _next) => {
  const { id } = req.params;

  const user = await GetUserByIdService(id);

  return res.status(StatusCodes.OK).json(user);
};

module.exports = getUserByIdController;
