import db from "../util/database";

export default class Post {
  title: string | null;
  description: string | null;
  createdAt: Date | null;
  email: string | null;
  constructor(
    title: string | null,
    description: string | null,
    createdAt: Date | null,
    email: string | null
  ) {
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.email = email;
  }

  save() {
    return db.execute(
      "INSERT INTO posts (title, description, createdAt, email) VALUES (?, ?, ?, ?)",
      [this.title, this.description, this.createdAt, this.email]
    );
  }

  deleteByID(id: string) {
    return db.execute("DELETE FROM posts WHERE id = ?", [id]);
  }

  adminFetchAll() {
    return db.execute("SELECT * FROM posts");
  }

  fetchAllByMail(email: string) {
    return db.execute("SELECT * FROM posts WHERE email = ?", [email]);
  }
}
