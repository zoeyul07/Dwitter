import { db } from "../db/database.js";

const SELECT_JOIN =
  "SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.userName, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id";

const ORDER_DESC = "ORDER By tw.createdAt DESC";

export async function getAll() {
  return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);
}

export async function getAllByUserName(userName) {
  return db
    .execute(`${SELECT_JOIN} WHERE userName=? ${ORDER_DESC}`, [userName])
    .then((result) => result[0]);
}

export async function getById(id) {
  return db
    .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id])
    .then((result) => result[0][0]);
}

export async function create(text, userId) {
  return db
    .execute(`INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)`, [
      text,
      new Date(),
      userId,
    ])
    .then((result) => getById(result[0].insertId));
}

export async function update(id, text) {
  return db
    .execute(`UPDATE tweets SET text=? WHERE id=?`, [text, id])
    .then(() => getById(id));
}

//javascript 자체에 delete가 있으므로 사용할 수 없음
export async function remove(id) {
  return db.execute("DELETE FROM tweets WHERE id=?", [id]);
}
