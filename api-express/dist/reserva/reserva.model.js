import { DataTypes, Model, } from 'sequelize';
import { Cliente } from '../cliente/cliente.model.js';
import { sequelize } from '../shared/conn.js';
export class Reserva extends Model {
}
Reserva.init({
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
}, {
    sequelize,
    modelName: 'reserva',
    tableName: 'reserva',
    timestamps: false,
});
Cliente.hasMany(Reserva, {
    foreignKey: 'idCliente',
});
Reserva.belongsTo(Cliente, {
    foreignKey: 'idCliente',
});
//# sourceMappingURL=reserva.model.js.map