import MongoDb from "mongodb";
import { config } from "../config.js";

//모듈 안에서만 쓸수 있도록 client.db() 할당
let db;

export async function connectDB() {
  return MongoDb.MongoClient.connect(config.db.mongoDBHost).then(
    (client) => (db = client.db())
  );
}

export function getUsers() {
  //솜누자로 작성해도 아틀라스에서 대분자로 저장된다.(Users)
  return db.collection("users");
}

export function getTweets() {
  return db.collection("tweets");
}
