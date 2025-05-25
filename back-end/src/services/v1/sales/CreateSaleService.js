const Sequelize = require("sequelize");
const config = require("../../../database/config/config");
const { Product, Sale, SalesProduct } = require("../../../database/models");
const { schemaSales } = require("../../../validators");
const {
  badRequest,
  notFound,
  internalError,
} = require("../../../errors/ApiError");

const sequelize = new Sequelize(config.development);

const getProductData = async (products) => {
  const productIds = products.map((p) => p.id);

  const dbProducts = await Product.findAll({
    where: { id: productIds },
    attributes: ["id", "price", "sellerId"],
  });

  if (dbProducts.length !== productIds.length) {
    return notFound("Alguns produtos não foram encontrados no banco de dados.");
  }

  return dbProducts.map((p) => ({
    id: p.id,
    price: p.price,
    sellerId: p.sellerId,
  }));
};

const isBuyingOwnProducts = (dbProducts, userId) => {
  return dbProducts.some((product) => product.sellerId === userId);
};

const groupProductsBySeller = (products, dbProducts) => {
  const sellerMap = {};

  products.forEach(({ id, quantity }) => {
    const productInfo = dbProducts.find((p) => p.id === id);
    const { sellerId, price } = productInfo;

    if (!sellerMap[sellerId]) sellerMap[sellerId] = [];

    sellerMap[sellerId].push({
      id,
      quantity,
      price,
      subtotal: price * quantity,
    });
  });

  return sellerMap;
};

const createSaleService = async (body) => {
  const { userId, deliveryAddress, deliveryNumber, status, products } = body;

  const validatorError = schemaSales(body);
  if (validatorError) return badRequest(validatorError);

  const dbProducts = await getProductData(products);
  if (isBuyingOwnProducts(dbProducts, userId)) {
    return badRequest("Você não pode comprar seus próprios produtos.");
  }

  const grouped = groupProductsBySeller(products, dbProducts);

  const transaction = await sequelize.transaction();

  try {
    const createdSales = [];

    for (const [sellerId, productList] of Object.entries(grouped)) {
      const totalPrice = productList.reduce((acc, p) => acc + p.subtotal, 0);

      const sale = await Sale.create(
        {
          userId,
          sellerId: Number(sellerId),
          totalPrice,
          deliveryAddress,
          deliveryNumber,
          saleDate: new Date(),
          status,
        },
        { transaction },
      );

      await Promise.all(
        productList.map((p) =>
          SalesProduct.create(
            {
              saleId: sale.id,
              productId: p.id,
              quantity: p.quantity,
            },
            { transaction },
          ),
        ),
      );

      createdSales.push(sale);
    }

    await transaction.commit();
    return createdSales;
  } catch (err) {
    await transaction.rollback();
    return internalError(err.message || "Erro ao criar vendas.");
  }
};

module.exports = createSaleService;
