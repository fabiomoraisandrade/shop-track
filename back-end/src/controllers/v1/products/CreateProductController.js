const { StatusCodes } = require("http-status-codes");
const { CreateProductService } = require("../../../services/v1");
const uploadToCloudinary = require("../../../utils/uploadToCloudinary");
const { badRequest } = require("../../../errors/ApiError");

const createProductController = async (req, res, _next) => {
  const { body, files } = req;
  const { name, price, sellerId } = body;

  if (!files || !files.file) {
    return badRequest("image file is required");
  }

  if (!price) return badRequest("price is required");

  if (!sellerId) return badRequest("sellerId is required");

  const priceNumber = parseFloat(price.replace(",", "."));
  const validatedPrice = Number(priceNumber.toFixed(2));
  const sellerIdNumber = Number(sellerId);

  if (!Number.isInteger(sellerIdNumber) || sellerIdNumber <= 0) {
    return badRequest("sellerId must be a valid positive integer");
  }

  const resultFile = await uploadToCloudinary(files.file);

  const productData = {
    name,
    price: validatedPrice,
    urlImage: resultFile.url,
    sellerId: sellerIdNumber,
  };

  const newProduct = await CreateProductService(productData);

  return res.status(StatusCodes.CREATED).json(newProduct);
};

module.exports = createProductController;
