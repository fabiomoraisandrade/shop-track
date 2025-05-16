const { StatusCodes } = require("http-status-codes");
const { CreateProductService } = require("../../../services/v1");
const uploadToCloudinary = require("../../../utils/uploadToCloudinary");
const { badRequest } = require("../../../errors/ApiError");

const createProductController = async (req, res, _next) => {
  const { body, files } = req;
  const { name, price } = body;

  if (!files || !files.file) {
    return badRequest("image file is required");
  }

  if (!price) return badRequest("price is required");

  const priceNumber = parseFloat(price.replace(",", "."));
  const validatedPrice = Number(priceNumber.toFixed(2));

  const resultFile = await uploadToCloudinary(files.file);

  const productData = {
    name,
    price: validatedPrice,
    urlImage: resultFile.url,
  };

  console.log(`productData: ${JSON.stringify(productData)}`);

  const newProduct = await CreateProductService(productData);

  return res.status(StatusCodes.CREATED).json(newProduct);
};

module.exports = createProductController;
