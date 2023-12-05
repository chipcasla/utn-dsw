import { Cliente } from './cliente.model.js';

export class ClienteRepository {
  public async findAll(): Promise<Cliente[] | undefined> {
    try {
      const clientes = await Cliente.findAll();
      return clientes;
    } catch (error) {
      throw error;
    }
  }

  public async findOne(item: { id: string }): Promise<Cliente | undefined> {
    try {
      const cliente = await Cliente.findByPk(parseInt(item.id));
      if (!cliente || cliente.dataValues.tipo != 'cliente') {
        return undefined;
      }
      return cliente;
    } catch (error) {
      throw error;
    }
  }

  public async findByDni(dni: String): Promise<Cliente | undefined> {
    try {
      const cliente = await Cliente.findOne({ where: {dni: dni} })
      if(cliente)
        return cliente;
    } catch (error) {
      throw error;
    }
  }

  public async add(item: any): Promise<Cliente | undefined> {
    try {
      const nuevoCliente = await Cliente.create(item);
      return nuevoCliente;
    } catch (error) {
      throw error;
    }
  }

  public async update(id: string, item: any): Promise<Cliente | undefined> {
    try {
      await Cliente.update(item, {
        where: {
          id: Number.parseInt(id),
          tipo: 'cliente',
        },
      });
      const clienteActualizado = await this.findOne({ id });
      return clienteActualizado;
    } catch (error) {
      throw error;
    }
  }

  public async delete(item: { id: string }): Promise<number> {
    try {
      const eliminados = await Cliente.destroy({
        where: {
          id: parseInt(item.id),
          tipo: 'cliente',
        },
      });
      return eliminados;
    } catch (error) {
      throw error;
    }
  }
}
