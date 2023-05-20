const Order = require("../models/order.model");
const User = require("../models/user.model");

const getOrders = (req, res) => {
  res.render("customer/orders/all-orders");
};

const addOrder = async (req, res) => {
  const cart = res.locals.cart;
  console.log(cart);

  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    console.log(error);
    next(error);
    return;
  }
  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    console.log(error);
    next(error);
    return;
  }

  res.session.cart = null; // 주문완효 후 session을 삭제해야함

  res.redirect("/orders");
};

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
};
