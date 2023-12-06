import { Cliente } from '../cliente/cliente.model.js';
import { Reseña } from './reseña.model.js'
//import { sequelize } from '../shared/conn.js';

export class ReseñaRepository {
  public async findAll(): Promise<Reseña[] | undefined> {
    try {
      const reseñas = await Reseña.findAll({
        include: [
          { model: Cliente },
        ],
      });
      return reseñas;
    } catch (error) {
      throw error;
    }
  }

  public async findOne(item: { id: string }): Promise<Reseña | undefined> {
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
    } catch (error) {
      throw error;
    }
  }

  public async add(item: any): Promise<Reseña | undefined> {
    try {
      const reseña = await Reseña.create(item);
      return reseña;
    } catch (error) {
      throw error;
    }
  }

  public async update(id: string, item: any): Promise<Reseña | undefined> {
    try {
      await Reseña.update(item, {
        where: {
          id: Number.parseInt(id),
        }, 
      });
      const reseña = await this.findOne({ id });
      return reseña;
    } catch (error) {
      throw error;
      }
  }

  public async delete(item: { id: string }): Promise<number> {
    try {
      const eliminadas = await Reseña.destroy({
        where: {
          id: parseInt(item.id),
        },
      });
      return eliminadas;
    } catch (error) {
      throw error;
    }
  }
}