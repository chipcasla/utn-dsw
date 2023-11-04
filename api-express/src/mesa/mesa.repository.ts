import { throws } from 'assert';
import { Reserva } from '../reserva/reserva.entity.js';
import { Repository } from '../shared/repository.js';
import { Mesa } from './mesa.entity.js';
import { Op } from 'sequelize';

export class MesaRepository implements Repository<Mesa> {
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

  public async findMesasLibres(cantidadPersonas: number, fechaHora: Date, ubicacion: string): Promise<Mesa[] | undefined> {
    try{
      const mesas= await Mesa.findAll({
        include: {model: Reserva,
        required: false,
        where: {
          estado: {
            [Op.ne]: 'Pendiente'
          },
          fechaHora: {
            [Op.ne]: fechaHora
          }
        }
      },
      where: {
        cantidadPersonas:{
          [Op.gte]: cantidadPersonas
        },
        ubicacion: ubicacion
      }
    })
    return mesas
  } catch(error){
    throw error;
  }
}

}
