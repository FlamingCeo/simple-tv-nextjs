import dotenv from "dotenv";
dotenv.config();

interface ConfigType {
  DB_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_PORT: number | string;
  PORT: number | string;
  DB_URI: string;
  JWT_SECRET: string;
}

let configs: ConfigType = {
  DB_HOST: "localhost",
  DB_USERNAME: "postgres",
  DB_PASSWORD: "password",
  DB_PORT: 5432,
  PORT: 5000,
  DB_URI: "postgres://postgres:password@localhost:5432/tvshows",
  JWT_SECRET: "test",
};

if (process.env.NODE_ENV !== "prod") {
  configs = {
    DB_HOST: process.env.DB_HOST || configs.DB_HOST,
    DB_USERNAME: process.env.DB_USERNAME || configs.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD || configs.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT || configs.DB_PORT,
    PORT: process.env.PORT || configs.PORT,
    DB_URI: process.env.DB_URI_DEV || configs.DB_URI,
    JWT_SECRET: process.env.JWT_SECRET || configs.JWT_SECRET,
   
  };
}

if (process.env.NODE_ENV === "prod") {
  configs = {
    DB_HOST: process.env.PROD_DB_HOST || "",
    DB_USERNAME: process.env.PROD_DB_USERNAME || "",
    DB_PASSWORD: process.env.PROD_DB_PASSWORD || "",
    DB_PORT: process.env.DB_PORT || 0,
    PORT: process.env.PORT || 80,
    DB_URI: process.env.DB_URI_PRD || "",
    JWT_SECRET: process.env.JWT_SECRET || "some_other_secret",
  };
}

export default configs;
