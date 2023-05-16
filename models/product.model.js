const mongodb = require("mongodb");

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
    if (productData._id) {
      // id가 있는 경우에만 가능하도록 조건문 설정
      this.id = productData._id.toString(); // _id는 mongodb의 id, toString()으로 문자열 변환필요!
    }
  }

  static async findById(productId) {
    let prodId;
    try {
      prodId = new mongodb.ObjectId(productId);
      console.log(prodId);
    } catch (error) {
      console.log(error);
      console.log("아이디찾기 실패");
      error.code = 404;
      throw error;
    }

    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: prodId });

    // 실패할수 있기때문에 에러처리
    if (!product) {
      const error = new Error("Object 아이디가 없습니다.");
      error.code = 404;
      throw error;
    }

    return product;
  }

  // 데이터베이스에있는 전체 정보를 보냄
  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();
    return products.map((productDocument) => {
      return new Product(productDocument);
    });
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
