import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../shared/conn.js';
import { Categoria } from '../categoria/categoria.model.js';
export class Plato extends Model {
}
Plato.init({
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
    idcategoria: {
        type: DataTypes.INTEGER,
        references: {
            model: Categoria,
            key: 'id',
        }
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
}, {
    sequelize,
    tableName: 'plato',
    timestamps: false,
});
//# sourceMappingURL=plato.model.js.map