import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { Cliente } from '../cliente/cliente.entity.js';
import { Mesa } from '../mesa/mesa.entity.js';
import { sequelize } from '../shared/conn.js';

export class Reserva extends Model<
  InferAttributes<Reserva>,
  InferCreationAttributes<Reserva>
> {
  declare id: Number;
  declare fechaHora: Date;
  declare cantidadPersonas: Number;
  declare estado: string;
  declare idCliente: Number;
  public getMesas!: BelongsToManyGetAssociationsMixin<Mesa>; //this is what was missing
  public addMesa!: BelongsToManyAddAssociationMixin<Mesa, undefined>; //this is what was missing
}

Reserva.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fechaHora: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cantidadPersonas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
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
    modelName: 'reserva',
    tableName: 'reserva', // Nombre de la tabla en la base de datos
    timestamps: false,
  }
);

Cliente.hasMany(Reserva, {
  foreignKey: 'idCliente',
});
Reserva.belongsTo(Cliente, {
  foreignKey: 'idCliente',
});
