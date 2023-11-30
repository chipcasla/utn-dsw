import { Plato } from './plato.model.js';
//import { Op } from 'sequelize';
export class PlatoRepository {
    async findAll() {
        try {
            const platos = await Plato.findAll();
            return platos;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(item) {
        try {
            const plato = await Plato.findByPk(parseInt(item.id));
            if (!plato) {
                return undefined;
            }
            return plato;
        }
        catch (error) {
            throw error;
        }
    }
    async add(item) {
        try {
            const nuevoPlato = await Plato.create(item);
            return nuevoPlato;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, item) {
        try {
            await Plato.update(item, {
                where: {
                    id: Number.parseInt(id),
                },
            });
            const platoActualizado = await this.findOne({ id });
            return platoActualizado;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(item) {
        try {
            const eliminadas = await Plato.destroy({
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
//# sourceMappingURL=plato.data.js.map