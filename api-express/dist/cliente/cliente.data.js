import { Cliente } from './cliente.model.js';
export class ClienteRepository {
    async findAll() {
        try {
            const clientes = await Cliente.findAll();
            return clientes;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(item) {
        try {
            const cliente = await Cliente.findByPk(parseInt(item.id));
            if (!cliente || cliente.dataValues.tipo != 'cliente') {
                return undefined;
            }
            return cliente;
        }
        catch (error) {
            throw error;
        }
    }
    async findByDni(dni) {
        try {
            const cliente = await Cliente.findOne({ where: { dni: dni } });
            if (!cliente || cliente.dataValues.tipo != 'cliente') {
                return undefined;
            }
            return cliente;
        }
        catch (error) {
            throw error;
        }
    }
    async add(item) {
        try {
            const nuevoCliente = await Cliente.create(item);
            return nuevoCliente;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, item) {
        try {
            await Cliente.update(item, {
                where: {
                    id: Number.parseInt(id),
                    tipo: 'cliente',
                },
            });
            const clienteActualizado = await this.findOne({ id });
            return clienteActualizado;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(item) {
        try {
            const eliminados = await Cliente.destroy({
                where: {
                    id: parseInt(item.id),
                    tipo: 'cliente',
                },
            });
            return eliminados;
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=cliente.data.js.map