const { User } = require("../../../database/models");
const { notFound } = require("../../../errors/ApiError");

const deleteUserService = async (id) => {
  const removedUser = await User.destroy({ where: { id } });
  if (!removedUser) return notFound("User not found");

  return removedUser;
};

module.exports = deleteUserService;
