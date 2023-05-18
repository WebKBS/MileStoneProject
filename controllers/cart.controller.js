const Product = require("../models/product.model");

const addCartItem = async (req, res, next) => {
  let product;
  try {
    product = await Product.findById(req.body.productId);
  } catch (error) {
    console.log(error);
    next(error);
    return;
  }
  const cart = res.locals.cart;
  cart.addItem(product);
  req.session.cart = cart;

  // 프론트로 내보내기
  res.status(201).json({
    message: "장바구니 업데이트!",
    newTotalItems: cart.totalQuantity,
  });
};

module.exports = {
  addCartItem: addCartItem,
};
