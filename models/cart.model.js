class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  // 카트 아이템 추가 로직
  addItem(product) {
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.product.id === product.id) {
        cartItem.quantity = item.quantity + 1;
        cartItem.totalPrice = item.totalPrice + product.price; // price를 더해서 합계

        this.items[i] = cartItem; // 배열에 저장

        this.totalQuantity++; // 장바구니 아이템 개수 (프론트로 전달할 수)
        this.totalPrice += product.price;
        return;
      }
    }

    this.items.push(cartItem);
    this.totalQuantity++; // 장바구니 아이템 개수 (프론트로 전달할 수)
    this.totalPrice += product.price;
  }

  updateItem(productId, newQuantity) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.product.id === product.id && newQuantity > 0) {
        const cartItem = { ...item };
        const quantityChange = newQuantity - item.quantity;
        cartItem.quantity = newQuantity;
        cartItem.totalPrice = newQuantity * product.price; // 수량 증가 곱셈

        this.items[i] = cartItem; // 배열에 저장

        this.totalQuantity += quantityChange;
        this.totalPrice += quantityChange * product.price;
        return { updateItemPrice: cartItem.totalPrice };
      } else if (item.product.id === product.id && newQuantity <= 0) {
        this.items.splice(i, 1);
        this.totalQuantity = this.totalQuantity - item.quantity;
        this.totalPrice -= item.totalPrice;
        return { updateItemPrice: 0 };
      }
    }
  }
}

module.exports = Cart;
