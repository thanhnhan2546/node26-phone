require("dotenv").config();
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  DB_NAME,
  JWT_SERCRET,
} = process.env;
const configs = {
  JWT_SERCRET,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  DB_NAME,
};

module.exports = configs;
