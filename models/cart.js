const Joi = require("joi");
const mongoose = require("mongoose");

const productInCartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  products: {
    type: [productInCartSchema],
    default: [],
  },
});

const Cart = mongoose.model("Cart", cartSchema);

const validateCart = (cart) => {
  const schema = Joi.object({
    user_id: Joi.objectId().required(),
    products: Joi.array().items(
      Joi.object({
        product: Joi.objectId().required(),
        quantity: Joi.number().min(1).required(),
      })
    ),
  });

  return schema.validate(cart);
};

module.exports.Cart = Cart;
module.exports.validate = validateCart;
