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
}

module.exports = ApiError;
