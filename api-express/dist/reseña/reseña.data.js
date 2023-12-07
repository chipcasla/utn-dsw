import { Cliente } from '../cliente/cliente.model.js';
import { Reseña } from './reseña.model.js';
//import { sequelize } from '../shared/conn.js';
export class ReseñaRepository {
    async findAll() {
        try {
            const reseñas = await Reseña.findAll({
                include: [
                    { model: Cliente },
                ],
            });
            return reseñas;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(item) {
        try {
            const reseña = await Reseña.findByPk(parseInt(item.id), {
                include: [
                    { model: Cliente },
                ],
            });
            if (!reseña) {
                return undefined;
            }
            return reseña;
        }
        catch (error) {
            throw error;
        }
    }
    async findByCliente(idCliente) {
        try {
            const reseña = await Reseña.findOne({ where: { idCliente: idCliente } });
            if (reseña) {
                return reseña;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async add(item) {
        try {
            const reseña = await Reseña.create(item);
            return reseña;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, item) {
        try {
            await Reseña.update(item, {
                where: {
                    id: Number.parseInt(id),
                },
            });
            const reseña = await this.findOne({ id });
            return reseña;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(item) {
        try {
            const eliminadas = await Reseña.destroy({
                where: {
                    id: parseInt(item.id),
                },
            });
            return eliminadas;
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=rese%C3%B1a.data.js.map