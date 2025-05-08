const { User } = require("../../../database/models");

const getAllUsersService = async () => {
  const users = await User.findAll({ attributes: { exclude: ["password"] } });

  return users;
};

module.exports = getAllUsersService;
