import { Dialect } from "sequelize";

interface SequelizeConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';
};

const username = process.env.DB_USER || 'postgres';
const password = process.env.DB_PASSWORD || 'postgres';
const database = process.env.DB_NAME || 'postgres';
const test_database = process.env.TEST_DB_NAME || 'postgres';
const host = process.env.DB_HOST || 'localhost';
const port = Number(process.env.DB_PORT) || 5432;


const sequelizeConfig: { [key: string]: SequelizeConfig } = {
  development: {
    username,
    password,
    database,
    host,
    port,
    dialect: 'postgres',
  },
  test: {
    username,
    password,
    database: test_database,
    host,
    port: 5433,
    dialect: 'postgres',
  },
  production: {
    username,
    password,
    database,
    host,
    port,
    dialect: 'postgres',
  }
};

export default sequelizeConfig;
