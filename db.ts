import mysql, { Connection, ConnectionOptions } from "mysql2";
require("dotenv").config();

const uri = process.env.MYSQL_URI;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;

const access: ConnectionOptions = {
  user: user,
  password: password,
  database: "hotelmirandadashboard",
};

function connectToDB(): Connection {
  const conn = mysql.createConnection(access);
  conn.connect((err) => {
    if (err) {
      console.error("Error al conectar a la base de datos:", err.message);
    } else {
      console.log("Conexión a la base de datos establecida correctamente.");
    }
  });
  return conn;
}

export default connectToDB;
