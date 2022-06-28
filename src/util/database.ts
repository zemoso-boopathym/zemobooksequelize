import { Sequelize } from "sequelize";
import { config } from "./config";

export const sequelize = new Sequelize(
  config.DB_NAME!,
  config.DB_USER!,
  config.DB_PWD,
  {
    dialect: "mysql",
    host: config.DB_HOST,
  }
);
