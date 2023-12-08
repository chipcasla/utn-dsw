import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../shared/conn.js';
export class Mesa extends Model {
}
Mesa.init({
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
}, {
    sequelize,
    tableName: 'mesa',
    timestamps: false,
});
//# sourceMappingURL=mesa.entity.js.map