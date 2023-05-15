const Product = require("../models/product.model");

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render("admin/products/all-products", { products: products });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getNewProduct = (req, res) => {
  res.render("admin/products/new-products");
};

const createNewProduct = async (req, res, next) => {
  //console.log(req.body);
  //console.log(req.file);

  const product = new Product({
    ...req.body, // 구조분해를 통해 image이전까지 모든 객체를 가져온다.
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
