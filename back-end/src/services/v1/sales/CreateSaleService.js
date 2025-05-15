const Sequelize = require("sequelize");
const config = require("../../../database/config/config");
const { Sale, SalesProduct } = require("../../../database/models");
const { schemaSales } = require("../../../validators");
const { badRequest, internalError } = require("../../../errors/ApiError");

const sequelize = new Sequelize(config.development);

const createSale = async (body, transaction) => {
  const {
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status,
  } = body;

  return Sale.create(
    {
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate: new Date(),
      status,
    },
    { transaction },
  );
};

const createSalesProducts = async (saleId, products, transaction) => {
  const salesProductPromises = products.map(({ id, quantity }) =>
    SalesProduct.create({ saleId, productId: id, quantity }, { transaction }),
  );

  await Promise.all(salesProductPromises);
};

const createSaleService = async (body) => {
  const validatorError = schemaSales(body);
  if (validatorError) return badRequest(validatorError);

  const { products } = body;
  const transaction = await sequelize.transaction();

  try {
    const sale = await createSale(body, transaction);
    await createSalesProducts(sale.id, products, transaction);

    await transaction.commit();

    return sale;
  } catch (error) {
    await transaction.rollback();
    return internalError(error.message || "Failed to create sale");
  }
};

module.exports = createSaleService;
