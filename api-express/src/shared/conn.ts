import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'restaurante_db',
  process.env.DB_USER || 'admin',
  process.env.DB_PASSWORD || 'admin',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      idle: 60000,
    },
  }
);
