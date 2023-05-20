const addOrder = (req, res) => {
  const cart = res.locals.cart;
  console.log(cart);
};

module.exports = {
  addOrder: addOrder,
};
