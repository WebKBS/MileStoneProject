class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  // 카트 아이템 추가 로직
  addItem(product) {
    const cartItme = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.product.id === product.id) {
        cartItme.quantity += 1;
        cartItme.totalPrice += product.price; // price를 더해서 합계

        this.items[i] = cartItme; // 배열에 저장

        this.totalQuantity++; // 장바구니 아이템 개수 (프론트로 전달할 수)
        this.totalPrice += product.price;
        return;
      }
    }

    this.items.push(cartItme);
    this.totalQuantity++; // 장바구니 아이템 개수 (프론트로 전달할 수)
    this.totalPrice += product.price;
  }
}

module.exports = Cart;
