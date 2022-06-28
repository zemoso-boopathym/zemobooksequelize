import { DataTypes } from "sequelize";
import { sequelize } from "../util/database";

export const User = sequelize.define("users", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
