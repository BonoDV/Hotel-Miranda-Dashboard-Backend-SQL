import { DataSource } from "typeorm/data-source/DataSource";
require("dotenv").config();
import { Room } from "./entities/Room";
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "hotelmirandadashboard",
  synchronize: true,
  logging: true,
  entities: [Room],
  subscribers: [],
  migrations: [],
});
