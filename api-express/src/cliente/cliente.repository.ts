import { Repository } from '../shared/repository.js';
import { Cliente } from './cliente.entity.js';

const clientes = [
  new Cliente('43000000', 'Alex', 'Turner', '0341101010', 'at@am.com', 1),
];
let nuevoID = 2;

export class ClienteRepository implements Repository<Cliente> {
  public findAll(): Cliente[] | undefined {
    return clientes;
  }

  public findOne(item: { id: string }): Cliente | undefined {
    return clientes.find(
      (cliente) => cliente.id && cliente.id.toString() === item.id
    );
  }

  public add(item: Cliente): Cliente | undefined {
    item.id = nuevoID;
    nuevoID += 1;
    clientes.push(item);
    return item;
  }

  public update(item: Cliente): Cliente | undefined {
    const clienteIdx = clientes.findIndex(
      (cliente) =>
        item.id && cliente.id && cliente.id.toString() === item.id.toString()
    );

    if (clienteIdx !== -1) {
      clientes[clienteIdx] = { ...clientes[clienteIdx], ...item };
    }
    return clientes[clienteIdx];
  }

  public delete(item: { id: string }): Cliente | undefined {
    const clienteIdx = clientes.findIndex(
      (cliente) => cliente.id && cliente.id.toString() === item.id
    );

    if (clienteIdx !== -1) {
      const deletedClientes = clientes[clienteIdx];
      clientes.splice(clienteIdx, 1);
      return deletedClientes;
    }
  }
}
