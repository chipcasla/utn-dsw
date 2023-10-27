import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../shared/conn.js';

export class Mesa extends Model {}

Mesa.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ubicacion: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'mesa', // Nombre de la tabla en la base de datos
    timestamps: false,
  }
);
