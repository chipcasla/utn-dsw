import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../shared/conn.js';

export class Plato extends Model {}

Plato.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    /*fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },*/
    ingredientes: {
      type: DataTypes.STRING,
      //type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    imagen_url: {
      type: DataTypes.STRING,
    },
    public_id: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'plato', // Nombre de la tabla en la base de datos
    timestamps: false,
  }
);
