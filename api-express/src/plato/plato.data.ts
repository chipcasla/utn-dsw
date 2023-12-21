import { Plato } from './plato.model.js';
//import { Op } from 'sequelize';

export class PlatoRepository {
  public async findAll(): Promise<Plato[] | undefined> {
    try {
      const platos = await Plato.findAll();
      return platos;
    } catch (error) {
      throw error;
    }
  }

  public async findOne(item: { id: string }): Promise<Plato | undefined> {
    try {
      const plato = await Plato.findByPk(parseInt(item.id));
      if (!plato) {
        return undefined;
      }
      return plato;
    } catch (error) {
      throw error;
    }
  }

  public async add(item: any): Promise<Plato | undefined> {
    try {
      const nuevoPlato = await Plato.create(item);
      return nuevoPlato;
    } catch (error) {
      throw error;
    }
  }

  public async update(id: string, item: any): Promise<Plato | undefined> {
    try {
      await Plato.update(item, {
        where: {
          id: Number.parseInt(id),
        },
      });
      const platoActualizado = await this.findOne({ id });
      return platoActualizado;
    } catch (error) {
      throw error;
    }
  }

  public async delete(item: { id: string }): Promise<number> {
    try {
      const eliminadas = await Plato.destroy({
        where: {
          id: parseInt(item.id),
        },
      });
      return eliminadas;
    } catch (error) {
      throw error;
    }
  }

  /*public async findPlatoDelDia(item: { fecha: String }): Promise<Plato | undefined> {
    try {
      const plato = await Plato.findOne({ where: { fecha:  } });
      if (!plato || plato.dataValues.tipo != 'plato') {
        return undefined;
      }
      return plato;
    } catch (error) {
      throw error;
    }
  }*/
}
