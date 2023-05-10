const bcrypt = require("bcryptjs");

const db = require("../data/database");

class User {
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street: street,
      postalCode: postal,
      city: city,
    }; // 객체안에 즉석으로 객체를 생성할수 있다.
  }

  async signup() {
    // bcrypt를 사용한 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(this.password, 12);

    await db.getDb().collection("user").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }
}

module.exports = User;
