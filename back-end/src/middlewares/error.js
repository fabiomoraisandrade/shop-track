const { StatusCodes } = require("http-status-codes");
const ApiError = require("../errors/ApiError");

module.exports = (err, _req, res, _next) => {
  console.error({ erro: err });

  if (err instanceof ApiError) {
    return res.status(err.code).json({ message: err.message });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Internal error!" });
};
