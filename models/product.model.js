const db = require("../data/database");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price; // 숫자로 변환
    this.description = productData.description;
    this.image = productData.image; // 이미지명
    this.imagePath = `product-data/images/${productData.image}`; //이미지 저장위치
    this.imageUrl = `/products/assets/images/${productData.image}`;
  }

  // 데이터베이스 저장
  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };
    await db.getDb().collection("products").insertOne(productData);
  }
}

module.exports = Product;
