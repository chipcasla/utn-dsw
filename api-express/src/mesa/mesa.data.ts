import { Op, col, fn, literal } from 'sequelize';
import { Reserva } from '../reserva/reserva.model.js';
import { Mesa } from './mesa.model.js';

export class MesaRepository {
  public async findAll(): Promise<Mesa[] | undefined> {
    try {
      const mesas = await Mesa.findAll();
      return mesas;
    } catch (error) {
      throw error;
    }
  }

  public async findOne(item: { id: string }): Promise<Mesa | undefined> {
    try {
      const mesa = await Mesa.findByPk(parseInt(item.id));
      if (!mesa) {
        return undefined;
      }
      return mesa;
    } catch (error) {
      throw error;
    }
  }

  public async add(item: any): Promise<Mesa | undefined> {
    try {
      const nuevaMesa = await Mesa.create(item);
      return nuevaMesa;
    } catch (error) {
      throw error;
    }
  }

  public async update(id: string, item: any): Promise<Mesa | undefined> {
    try {
      await Mesa.update(item, {
        where: {
          id: Number.parseInt(id),
        },
      });
      const mesaActualizada = await this.findOne({ id });
      return mesaActualizada;
    } catch (error) {
      throw error;
    }
  }

  public async delete(item: { id: string }): Promise<number> {
    try {
      const eliminadas = await Mesa.destroy({
        where: {
          id: parseInt(item.id),
        },
      });
      return eliminadas;
    } catch (error) {
      throw error;
    }
  }

  public async findMesasLibres(
    cantidadPersonas: number,
    fechaHora: Date,
    ubicacion: string
  ): Promise<Mesa[] | undefined> {
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
        group: ['Mesa.id', 'Reservas.id'],
        having: literal('COUNT(Reservas.id) = 0'),
      });

      return mesas;
    } catch (error) {
      throw error;
    }
  }
}
