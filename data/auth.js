import { db } from "../db/database.js";

export async function findByUserName(userName) {
  return db
    .execute("SELECT * FROM users WHERE userName=?", [userName])
    .then((result) => result[0][0]);
}

export async function findById(id) {
  return db
    .execute("SELECT * FROM users WHERE id=?", [id])
    .then((result) => result[0][0]);
}

export async function createUser(user) {
  const { userName, password, name, email, url } = user;
  return db
    .execute(
      "INSERT INTO users (userName, password, name, email, url) VALUES(?,?,?,?,?)",
      [userName, password, name, email, url]
    )
    .then((result) => result[0].insertId);
}
