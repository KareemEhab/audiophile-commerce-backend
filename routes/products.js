const auth = require("../middleware/auth");
const { Router } = require("express");
const router = Router();
const { Product, validate } = require("../models/product");

// Function to exclude __v field
const excludeVField = { __v: 0 };

// Get all products
router.get("/", auth, async (req, res) => {
  const products = await Product.find({}, excludeVField);
  res.send(products);
});

// Create a new product
router.post("/", auth, async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let product = new Product(req.body);

  await product.save();

  res.send(product);
});

// Get product By ID
router.get("/:id", auth, async (req, res) => {
  const product = await Product.findById(req.params.id).select(excludeVField);
  if (!product)
    return res
      .status(404)
      .send("The product with the given ID does not exist.");
  res.send(product);
});

// Get product By Category
router.get("/:category", auth, async (req, res) => {
  const products = await Product.find({ category: req.params.category }).select(
    excludeVField
  );

  if (!products)
    return res.status(404).send("The given category does not exist.");

  res.send(products);
});

// Get a certain product
router.get("/:category/:slug", auth, async (req, res) => {
  const product = await Product.findOne({
    category: req.params.category,
    slug: req.params.slug,
  }).select(excludeVField);

  if (!product) {
    return res
      .status(404)
      .send("The product with the given category and slug does not exist.");
  }

  res.send(product);
});

// Update product By ID
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    console.error(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  const product = await Product.findById(req.params.id).select(excludeVField);
  if (!product) {
    return res
      .status(404)
      .send("The product with the given ID does not exist.");
  }

  Object.assign(product, req.body);

  const updatedProduct = await product.save();
  res.send(updatedProduct);
});

// Delete product By ID
router.delete("/:id", auth, async (req, res) => {
  const product = await Product.findById(req.params.id).select(excludeVField);
  if (!product) {
    return res
      .status(404)
      .send("The product with the given ID does not exist.");
  }

  const deletedProduct = await Product.findByIdAndDelete(req.params.id).select(
    excludeVField
  );
  res.send(deletedProduct);
});

module.exports = router;
