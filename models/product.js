const Joi = require("joi");
const mongoose = require("mongoose");

const includedItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    mobile: String,
    tablet: String,
    desktop: String,
  },
  category: {
    type: String,
    required: true,
  },
  categoryImage: {
    mobile: String,
    tablet: String,
    desktop: String,
  },
  new: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: {
    type: String,
    required: true,
  },
  includes: {
    type: [includedItemSchema],
    required: true,
  },
  gallery: {
    first: {
      mobile: String,
      tablet: String,
      desktop: String,
    },
    second: {
      mobile: String,
      tablet: String,
      desktop: String,
    },
    third: {
      mobile: String,
      tablet: String,
      desktop: String,
    },
  },
  others: [
    {
      slug: String,
      name: String,
      image: {
        mobile: String,
        tablet: String,
        desktop: String,
      },
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

const validateProduct = (product) => {
  const schema = Joi.object({
    slug: Joi.string().required(),
    name: Joi.string().required(),
    image: Joi.object({
      mobile: Joi.string().required(),
      tablet: Joi.string().required(),
      desktop: Joi.string().required(),
    }),
    category: Joi.string().required(),
    categoryImage: Joi.object({
      mobile: Joi.string().required(),
      tablet: Joi.string().required(),
      desktop: Joi.string().required(),
    }),
    new: Joi.boolean(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    features: Joi.string().required(),
    includes: Joi.array().items(
      Joi.object({
        quantity: Joi.number().required(),
        item: Joi.string().required(),
      })
    ),
    gallery: Joi.object({
      first: Joi.object({
        mobile: Joi.string().required(),
        tablet: Joi.string().required(),
        desktop: Joi.string().required(),
      }),
      second: Joi.object({
        mobile: Joi.string().required(),
        tablet: Joi.string().required(),
        desktop: Joi.string().required(),
      }),
      third: Joi.object({
        mobile: Joi.string().required(),
        tablet: Joi.string().required(),
        desktop: Joi.string().required(),
      }),
    }),
    others: Joi.array().items(
      Joi.object({
        slug: Joi.string().required(),
        name: Joi.string().required(),
        image: Joi.object({
          mobile: Joi.string().required(),
          tablet: Joi.string().required(),
          desktop: Joi.string().required(),
        }),
      })
    ),
  });

  return Joi.validate(product, schema);
};

module.exports.Product = Product;
module.exports.validate = validateProduct;
