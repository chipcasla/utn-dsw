import { Cliente } from '../cliente/cliente.model.js';
import { Mesa } from '../mesa/mesa.model.js';
import { sequelize } from '../shared/conn.js';
import { Reserva } from './reserva.model.js';

export class ReservaRepository {
  public async findAll(): Promise<Reserva[] | undefined> {
    try {
      const reservas = await Reserva.findAll({
        include: [
          { model: Mesa, through: { attributes: [] } },
          { model: Cliente },
        ],
      });
      return reservas;
    } catch (error) {
      throw error;
    }
  }

  public async findOne(item: { id: string }): Promise<Reserva | undefined> {
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
    } catch (error) {
      throw error;
    }
  }

  public async add(item: any): Promise<Reserva | undefined> {
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
    } catch (error) {
      throw error;
    }
  }

  public async update(id: string, item: any): Promise<Reserva | undefined> {
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
      await reserva?.setMesas(
        item.Mesas.map((m: { id: any }) => m.id),
        { transaction }
      );
      await transaction.commit();
      return reserva?.reload();
    } catch (error) {
      throw error;
    }
  }

  public async delete(item: { id: string }): Promise<number> {
    try {
      const eliminadas = await Reserva.destroy({
        where: {
          id: parseInt(item.id),
        },
      });
      return eliminadas;
    } catch (error) {
      throw error;
    }
  }

  public async findPendientes(): Promise<Reserva[] | undefined>{
    try{
      const reservas = await Reserva.findAll({
        where: {
          estado: 'Pendiente'
        },
    });
    return reservas;
    } catch(error){
      throw(error)
    }
  }
}
