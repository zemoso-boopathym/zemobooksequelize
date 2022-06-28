const dotenv = require("dotenv");
dotenv.config();
export const config = {
  PORT: process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
  USER_TOKEN: process.env.USER_TOKEN,
  ADMIN_TOKEN: process.env.ADMIN_TOKEN,
  INVALID_TOKEN: "SOME_TOKEN",
  TEST_PWD: process.env.TEST_PWD,
  ADMIN_PWD: process.env.ADMIN_PWD,
  WRONG_PWD: process.env.WRONG_PWD,
  DB_PWD: process.env.DB_PWD,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
};
