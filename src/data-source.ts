import "reflect-metadata";
import { DataSource } from 'typeorm';
import { User } from "./entities/User";

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'techno@123',
  database: 'newsdb',
  entities: [User],
  migrations: ["src/migrations/**/*.ts"],
  synchronize: false, // Note: Set to false in production


});

export default AppDataSource;