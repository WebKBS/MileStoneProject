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

  // 프로미스를 반환하므로 async가 필요없다.
  getUserWithSameEmail() {
    // 데이터베이스에서 user 이메일이 일치하는지 확인
    return db.getDb().collection("user").findOne({ email: this.email });
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

  hasMatchingPassword(hashedPassword) {
    // 비밀번호 일치 확인, 파라미터는 해시된 번호
    bcrypt.compare(this.password, hashedPassword);
  }
}

module.exports = User;
