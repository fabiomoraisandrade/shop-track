const { StatusCodes } = require("http-status-codes");
const { DeleteUserService } = require("../../../services/v1");

const deleteUserController = async (req, res, _next) => {
  const { id } = req.params;

  await DeleteUserService(id);

  return res.status(StatusCodes.NO_CONTENT).end();
};

module.exports = deleteUserController;
