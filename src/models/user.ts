import db from "../util/database";

export default class User {
  email: string | null;
  password: string | null;
  constructor(email: string | null, password: string | null) {
    this.email = email ?? "";
    this.password = password ?? "";
  }

  save() {
    return db.execute("INSERT INTO users (email, password) VALUES (?, ?)", [
      this.email,
      this.password,
    ]);
  }

  fetchAll() {
    return db.execute("SELECT email FROM users");
  }

  deleteByMail(email: string) {
    if (email) {
      return db.execute("DELETE FROM users WHERE email = ?", [email]);
    }
  }

  findByMail(email: string) {
    if (email) {
      return db.execute("SELECT * FROM users WHERE email = ?", [email]);
    }
  }
}
