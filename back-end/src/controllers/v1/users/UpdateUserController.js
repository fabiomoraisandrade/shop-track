const { StatusCodes } = require("http-status-codes");
const { UpdateUserService } = require("../../../services/v1");

const updateUserController = async (req, res, _next) => {
  const { id } = req.params;
  const { body } = req;

  await UpdateUserService(id, body);

  return res.status(StatusCodes.NO_CONTENT).end();
};

module.exports = updateUserController;
