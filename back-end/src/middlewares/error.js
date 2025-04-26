const { StatusCodes } = require("http-status-codes");
const ApiError = require("../errors/ApiError");

module.exports = (err, req, res, next) => {
  console.error({ erro: err });

  if (err instanceof ApiError) {
    return res.status(err.code).json({ message: err.message });
  }

  return res.status(500).json({ message: "Internal error!" });
};
