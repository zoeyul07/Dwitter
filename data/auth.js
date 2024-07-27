import SQ from "sequelize";
import { sequelize } from "../db/database.js";

const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    name: { type: DataTypes.STRING(128), allowNull: false },
    url: DataTypes.TEXT,
  },
  //자동으로 createdAt과 updatedAt 필드를 만들어줌, 해제 원할시 하단 코드 추가
  { timestamps: false }
);
export async function findByUserName(userName) {
  return User.findOne({ where: { userName } });
}

export async function findById(id) {
  return User.findByPk(id);
}

export async function createUser(user) {
  return User.create(user).then((data) => data.dataValues.id);
}
