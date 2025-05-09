const { User } = require("../../../database/models");
const ApiError = require("../../../errors/ApiError");

const { badRequest } = ApiError;

const getUserByIdService = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) return badRequest("User not found!");

  return user;
};

module.exports = getUserByIdService;
