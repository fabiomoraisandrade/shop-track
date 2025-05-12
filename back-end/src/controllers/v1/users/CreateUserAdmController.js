const { StatusCodes } = require("http-status-codes");
const { CreateUserAdmService } = require("../../../services/v1");

const createUserAdmController = async (req, res, _next) => {
  const { body } = req;

  const { id, name, email, role } = await CreateUserAdmService(body);

  return res.status(StatusCodes.CREATED).json({ id, name, email, role });
};

module.exports = createUserAdmController;
