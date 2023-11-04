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
}
