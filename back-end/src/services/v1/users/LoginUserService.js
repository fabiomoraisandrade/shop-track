const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../../database/models");
const { validateLogin } = require("../../../validators");
const ApiError = require("../../../errors/ApiError");

const { badRequest, unauthorized } = ApiError;

const jwtConfig = {
  expiresIn: "12h",
  algorithm: "HS256",
};

const loginUserService = async (loginData) => {
  const SECRET = process.env.JWT_SECRET;

  const error = validateLogin(loginData);
  if (error) return badRequest(error);

  const user = await User.findOne({ where: { email: loginData.email } });
  if (!user) return unauthorized("Email ou senha inválido!");

  const passwordMatch = await bcrypt.compare(loginData.password, user.password);
  if (!passwordMatch) return unauthorized("Email ou senha inválido!");

  const { password, ...userWithoutPassword } = user.dataValues;

  const token = jwt.sign(userWithoutPassword, SECRET, jwtConfig);

  return {
    token,
    ...userWithoutPassword,
  };
};

module.exports = loginUserService;
