import { Op, col, fn, literal } from 'sequelize';
import { Reserva } from '../reserva/reserva.model.js';
import { Mesa } from './mesa.model.js';
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
    async findMesasLibres(cantidadPersonas, fechaHora, ubicacion) {
        try {
            const mesas = await Mesa.findAll({
                attributes: [
                    'id',
                    'capacidad',
                    'ubicacion',
                    [fn('COUNT', col('Reservas.id')), 'reservasCount'],
                ],
                include: {
                    model: Reserva,
                    required: false,
                    where: {
                        estado: 'Pendiente',
                        fechaHora: fechaHora,
                    },
                },
                where: {
                    capacidad: {
                        [Op.gte]: cantidadPersonas,
                    },
                    ubicacion: ubicacion,
                },
                group: ['Mesa.id'],
                having: literal('COUNT(Reservas.id) = 0'),
            });
            return mesas;
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=mesa.data.js.map