import { Cliente } from '../cliente/cliente.entity.js';
import { Mesa } from '../mesa/mesa.entity.js';
import { sequelize } from '../shared/conn.js';
import { Reserva } from './reserva.entity.js';
export class ReservaRepository {
    async findAll() {
        try {
            const reservas = await Reserva.findAll({
                include: [
                    { model: Mesa, through: { attributes: [] } },
                    { model: Cliente },
                ],
            });
            return reservas;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(item) {
        try {
            const reserva = await Reserva.findByPk(parseInt(item.id), {
                include: [
                    {
                        model: Mesa,
                    },
                    {
                        model: Cliente,
                    },
                ],
            });
            if (!reserva) {
                return undefined;
            }
            return reserva;
        }
        catch (error) {
            throw error;
        }
    }
    async add(item) {
        const transaction = await sequelize.transaction();
        try {
            const reserva = await Reserva.create(item, {
                transaction,
            });
            for (const mesa of item.Mesas) {
                const m = await Mesa.findByPk(mesa.id);
                if (m) {
                    await reserva.addMesa(m, {
                        transaction,
                    });
                }
            }
            await transaction.commit();
            return reserva;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, item) {
        const transaction = await sequelize.transaction();
        try {
            const { Mesas, ...ReservaRow } = item;
            await Reserva.update(ReservaRow, {
                where: {
                    id: Number.parseInt(id),
                },
                transaction,
            });
            const reserva = await this.findOne({ id });
            await reserva.setMesas(item.Mesas.map((m) => m.id), { transaction });
            await transaction.commit();
            return reserva.reload();
        }
        catch (error) {
            throw error;
        }
    }
    async delete(item) {
        try {
            const eliminadas = await Reserva.destroy({
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
//# sourceMappingURL=reserva.repository.js.map