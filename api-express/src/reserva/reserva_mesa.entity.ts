import { Model } from 'sequelize';
import { sequelize } from '../shared/conn.js';
import { Mesa } from '../mesa/mesa.entity.js';
import { Reserva } from './reserva.entity.js';

export class ReservaMesa extends Model {}
ReservaMesa.init(
  {},
  {
    sequelize,
    modelName: 'ReservaMesa',
    tableName: 'reserva_mesa',
    timestamps: false,
  }
);
Mesa.belongsToMany(Reserva, { through: ReservaMesa });
Reserva.belongsToMany(Mesa, { through: ReservaMesa });
