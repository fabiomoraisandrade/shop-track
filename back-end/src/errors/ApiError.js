const { StatusCodes } = require("http-status-codes");

class ApiError {
  constructor(message, code) {
    this.message = message;
    this.code = code;
  }

  static badRequest(message) {
    throw new ApiError(message, StatusCodes.BAD_REQUEST);
  }

  static notFound(message) {
    throw new ApiError(message, StatusCodes.NOT_FOUND);
  }

  static conflict(message) {
    throw new ApiError(message, StatusCodes.CONFLICT);
  }

  static unauthorized(message) {
    throw new ApiError(message, StatusCodes.UNAUTHORIZED);
  }

  static internalError(message) {
    throw new ApiError(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = ApiError;
