const joi = require("joi");

const schema = joi.object().keys({
  userId: joi.number().empty(false).required(),
  sellerId: joi.number().empty(false).required(),
  totalPrice: joi.number().empty(false).required(),
  deliveryAddress: joi.string().empty(false).required(),
  deliveryNumber: joi.string().empty(false).required(),
  status: joi.string().empty(false).required(),
  products: joi.array().empty(false).required(),
});

const schemaStatus = joi.string().empty(false).required();

const schemaSales = (sale) => {
  const { error } = schema.validate(sale);

  if (error) {
    return error.details[0].message;
  }

  return false;
};

const schemaSalesUpdate = (status) => {
  const { error } = schemaStatus.validate(status);

  if (error) {
    return error.details[0].message;
  }

  return false;
};

module.exports = { schemaSales, schemaSalesUpdate };
