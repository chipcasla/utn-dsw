import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import { sequelize } from '../shared/conn.js';
import { Cliente } from '../cliente/cliente.model.js';

export class Reseña extends Model<
InferAttributes<Reseña>,
InferCreationAttributes<Reseña>
>{
  declare id: Number;
  declare comentario: String;
  declare puntaje: Number;
  declare idCliente: Number;
}

Reseña.init( 
    {
    id:{ 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
       },
    comentario: {
        type: DataTypes.STRING
        },
    puntaje: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Cliente,
          key: 'id',
        },
      },

    },
    {
      sequelize,
      tableName: 'reseña',
      timestamps: true,
    }
);

Cliente.hasOne(Reseña, {
    foreignKey: 'idCliente',
  });
Reseña.belongsTo(Cliente, {
    foreignKey: 'idCliente',
  });