const Product = require("../models/product.model");

const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render("customer/products/all-products", { products: products });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllProduct: getAllProduct,
};
