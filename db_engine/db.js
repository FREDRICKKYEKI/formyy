import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";

configDotenv();

if (process.env["DB_USER"] === undefined) {
  throw new Error("DB_USER is not set");
} else if (process.env["DB_PASS"] === undefined) {
  throw new Error("DB_PASS is not set");
} else if (process.env["DEV_DB"] === undefined) {
  throw new Error("DEV_DB is not set");
}

const db = new Sequelize(
  process.env["DEV_DB"],
  process.env["DB_USER"],
  process.env["DB_PASS"],
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default db;
