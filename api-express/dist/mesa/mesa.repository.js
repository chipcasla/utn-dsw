import { Mesa } from './mesa.entity.js';
export class MesaRepository {
    async findAll() {
        try {
            const mesas = await Mesa.findAll();
            return mesas;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(item) {
        try {
            const mesa = await Mesa.findByPk(parseInt(item.id));
            if (!mesa) {
                return undefined;
            }
            return mesa;
        }
        catch (error) {
            throw error;
        }
    }
    async add(item) {
        try {
            const nuevaMesa = await Mesa.create(item);
            return nuevaMesa;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, item) {
        try {
            await Mesa.update(item, {
                where: {
                    id: Number.parseInt(id),
                },
            });
            const mesaActualizada = await this.findOne({ id });
            return mesaActualizada;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(item) {
        try {
            const eliminadas = await Mesa.destroy({
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
//# sourceMappingURL=mesa.repository.js.map