const { User } = require("../../../database/models");
const { notFound } = require("../../../errors/ApiError");

const getUserByIdService = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) return notFound("User not found");

  return user;
};

module.exports = getUserByIdService;
