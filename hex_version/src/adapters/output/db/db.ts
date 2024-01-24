import { Dialect, Sequelize } from "sequelize";
import sequelizeConfig from "./sequelize.config";

const env = process.env.NODE_ENV || 'development';
const { database, username, password, host, port, dialect, ...sequelizeOptions } = sequelizeConfig[env];

const db = new Sequelize(database, username, password, {
  host: host,
  port: port,
  dialect: dialect,
});

export default db;
