require('dotenv').config();
import configs from "./default.config";

module.exports = {
  dev: {
    dialect: 'postgres',
    url: configs.DB_URI,
    logging: false,
  },
  test: {
    dialect: 'postgres',
    url: process.env.DB_URI_STAGING,
    logging: false,
  },
  prod: {
    dialect: 'postgres',
    url: configs.DB_URI,
    logging: false,
  },
};