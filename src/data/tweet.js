import { sequelize } from "../db/database.js";
import SQ from "sequelize";
import { User } from "./auth.js";

const Sequelize = SQ.Sequelize;
const DataTypes = SQ.DataTypes;

const Tweet = sequelize.define("tweet", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: { type: DataTypes.TEXT, allowNull: false },
});
//foreign key 연결
Tweet.belongsTo(User);

const INCLUDE_USER = {
  attributes: [
    "id",
    "text",
    "createdAt",
    "userId",
    [Sequelize.col("user.name"), "name"],
    [Sequelize.col("user.name"), "userName"],
    [Sequelize.col("user.name"), "url"],
  ],
  include: { model: User, attributes: [] },
};

const ORDER_DESC = { order: [["createdAt", "DESC"]] };
export async function getAll() {
  return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
}

export async function getAllByUserName(userName) {
  return Tweet.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
    include: { ...INCLUDE_USER.include, where: { userName } },
  });
}

export async function getById(id) {
  return Tweet.findOne({ where: { id }, ...INCLUDE_USER });
}

export async function create(text, userId) {
  console.log(text);
  return Tweet.create({ text, userId }).then((data) =>
    this.getById(data.dataValues.id)
  );
}

export async function update(id, text) {
  return Tweet.findByPk(id, INCLUDE_USER).then((tweet) => {
    tweet.text = text;
    //저장한 자기자신 promise로 Return
    return tweet.save();
  });
}

//javascript 자체에 delete가 있으므로 사용할 수 없음
export async function remove(id) {
  console.log(id);
  return Tweet.findByPk(id).then((tweet) => {
    console.log(tweet);
    tweet.destroy();
  });
}
