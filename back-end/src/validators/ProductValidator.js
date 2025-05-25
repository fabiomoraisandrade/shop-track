const joi = require("joi");

const schema = joi.object().keys({
  name: joi.string().empty(false).required().max(100),
  price: joi.number().empty(false).required().min(0).precision(2),
  urlImage: joi.string().empty(false).required().max(200),
  sellerId: joi.number().empty(false).required().min(1),
});

const productValidate = (product) => {
  const { error } = schema.validate(product);

  if (error) {
    return error.details[0].message;
  }

  return false;
};

module.exports = productValidate;
