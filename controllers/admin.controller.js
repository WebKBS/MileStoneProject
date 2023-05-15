const Product = require("../models/product.model");

const getProducts = (req, res) => {
  res.render("admin/products/all-products");
};

const getNewProduct = (req, res) => {
  res.render("admin/products/new-products");
};

const createNewProduct = async (req, res, next) => {
  console.log(req.body);
  console.log(req.file);

  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await product.save();
  } catch (error) {
    console.log(error);
    next(error);
    return;
  }

  res.redirect("/admin/products");
};

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
};
