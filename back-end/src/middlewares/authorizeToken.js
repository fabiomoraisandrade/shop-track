require("dotenv").config();
const jwt = require("jsonwebtoken");
const ApiError = require("../errors/ApiError");

const { unauthorized } = ApiError;

const SECRET = process.env.JWT_SECRET;

const validateToken = async (token) => {
  try {
    const userInfo = jwt.verify(token, SECRET);
    return userInfo;
  } catch (err) {
    return false;
  }
};

const authorizeToken = async (req, _res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) return unauthorized("Token not found");

  const token = authToken.split(" ")[1];

  const validToken = await validateToken(token);

  if (!validToken) return unauthorized("Expired or invalid token");

  req.userInfo = validToken;

  return next();
};

module.exports = authorizeToken;
