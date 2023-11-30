import { Model } from 'sequelize';
import { Mesa } from '../mesa/mesa.model.js';
import { sequelize } from '../shared/conn.js';
import { Reserva } from './reserva.model.js';
export class ReservaMesa extends Model {
}
ReservaMesa.init({}, {
    sequelize,
    modelName: 'ReservaMesa',
    tableName: 'reserva_mesa',
    timestamps: false,
});
Mesa.belongsToMany(Reserva, { through: ReservaMesa });
Reserva.belongsToMany(Mesa, { through: ReservaMesa });
//# sourceMappingURL=reserva_mesa.entity.js.map