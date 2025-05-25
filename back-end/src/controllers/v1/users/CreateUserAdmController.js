const { StatusCodes } = require("http-status-codes");
const { CreateUserAdmService } = require("../../../services/v1");

const createUserAdmController = async (req, res, _next) => {
  const { body } = req;

  const { id, name, email, isAdmin } = await CreateUserAdmService(body);

  return res.status(StatusCodes.CREATED).json({ id, name, email, isAdmin });
};

module.exports = createUserAdmController;
