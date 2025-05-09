const bcrypt = require("bcryptjs");
const { User } = require("../../../database/models");
const { validateUser } = require("../../../validators");
const ApiError = require("../../../errors/ApiError");

const { badRequest } = ApiError;

const updateUserService = async (id, body) => {
  const error = validateUser(body);
  if (error) return badRequest(error);

  const userExists = await User.findByPk(id);
  if (!userExists) return badRequest("User not found!");

  const { password, ...userWithoutPassword } = body;

  const updatedFields = { ...userWithoutPassword };

  if (password) {
    updatedFields.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await User.update(updatedFields, { where: { id } });

  return updatedUser;
};

module.exports = updateUserService;
