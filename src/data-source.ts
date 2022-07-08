import { User } from "./components/user/user.entity";
import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PORT, DB_URL } from "./config";
import path from "path";

export const Database = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT),
  username: "postgres",
  password: "postgres",
  database: DB_NAME,
  // synchronize: true,
  logging: ["query", "error"],
  entities: [User],
  migrations: [path.join(__dirname, "./migrations/*")]
})