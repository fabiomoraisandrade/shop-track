const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { User } = require("../../../database/models");
const { validateUser } = require("../../../validators");
const ApiError = require("../../../errors/ApiError");

const { badRequest, conflict } = ApiError;

const createUserAdmService = async (newUser) => {
  const error = validateUser(newUser);
  if (error) return badRequest(error);

  const emailExists = await User.findOne({
    where: {
      [Op.or]: [{ name: newUser.name }, { email: newUser.email }],
    },
  });

  if (emailExists) return conflict("Email alredy registered");

  newUser.isAdmin = true;

  const hashedPassword = await bcrypt.hash(newUser.password, 10);

  const { password, ...userWithoutPassword } = newUser;

  const createdUser = await User.create({
    ...userWithoutPassword,
    password: hashedPassword,
  });

  return createdUser;
};

module.exports = createUserAdmService;
