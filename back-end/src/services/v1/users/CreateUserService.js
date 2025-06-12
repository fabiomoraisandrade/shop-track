const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User } = require("../../../database/models");
const { validateUser } = require("../../../validators");
const ApiError = require("../../../errors/ApiError");

const { badRequest, conflict } = ApiError;

const jwtConfig = {
  expiresIn: "12h",
  algorithm: "HS256",
};

const createUserService = async (newUser) => {
  const SECRET = process.env.JWT_SECRET;

  const error = validateUser(newUser);
  if (error) return badRequest(error);

  const emailExists = await User.findOne({
    where: {
      [Op.or]: [{ name: newUser.name }, { email: newUser.email }],
    },
  });

  if (emailExists) return conflict("Email alredy registered");

  const hashedPassword = await bcrypt.hash(newUser.password, 10);

  const { password, ...userWithoutPassword } = newUser;

  const { dataValues } = await User.create({
    ...userWithoutPassword,
    password: hashedPassword,
  });

  const token = jwt.sign(userWithoutPassword, SECRET, jwtConfig);

  return {
    token,
    ...dataValues,
  };
};

module.exports = createUserService;
