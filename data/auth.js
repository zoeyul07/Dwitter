//캡슐화 되어있기 떄문에 어플리케이션 코드를 수정하지 않고 데이터베이스를 변경할 수 있다.
import { getUsers } from "../db/database.js";
import MongoDb from "mongodb";
let users = [];

// prettier-ignore
const ObjectId = new MongoDb.ObjectId;

export async function findByUserName(userName) {
  return getUsers().findOne({ userName }).then(mapOptionalUser);
}

export async function findById(id) {
  return getUsers()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalUser);
}

export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((data) => data.insertedId.toString());
}
//전달받은 데이터가 있을수도 있고 없을수도 있다.
function mapOptionalUser(user) {
  return user ? { ...user, id: user._id } : user;
}
