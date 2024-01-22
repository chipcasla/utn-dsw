import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../shared/conn.js';

export class Categoria extends Model {}

Categoria.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    descripcion: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'categoria',
    timestamps: false,
  }
);
