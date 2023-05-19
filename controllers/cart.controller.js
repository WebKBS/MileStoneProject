const Product = require("../models/product.model");

const getCart = (req, res) => {
  res.render("customer/cart/cart");
};

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

const updateCartItem = (req, res) => {
  const cart = res.locals.cart;

  const updatedItemData = cart.updateItem(
    req.body.productId,
    req.body.quantity
  );

  req.session.cart = cart;

  res.json({
    message: "아이템 업데이트!",
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
    },
  });
};

module.exports = {
  addCartItem: addCartItem,
  getCart: getCart,
  updateCartItem: updateCartItem,
};
