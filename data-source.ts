import { DataSource } from "typeorm/data-source/DataSource";
require("dotenv").config();
import { Room } from "./entities/Room";
import { Booking } from "./entities/Booking";
import { User } from "./entities/User";
import { Amenity } from "./entities/Amenity";
import { RoomAmenity } from "./entities/RoomAmenity";
export const AppDataSource = new DataSource({
  type: "mysql",
  driver: require("mysql2"),
  host: "localhost",
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "hotelmirandadashboard",
  synchronize: true,
  logging: false,
  entities: [Room, Booking, User, Amenity, RoomAmenity],
  subscribers: [],
  migrations: [],
});
