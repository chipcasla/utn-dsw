import { Repository } from "../../shared/repository.js";
import { Mesa } from "./mesa.entity.js";

const mesas = [
  new Mesa(
    1,
    4,
    true,
    'afuera'
  ),
]

export class MesaRepository implements Repository<Mesa>{
  public findAll(): Mesa[] | undefined {
    return mesas
  }

  public findOne(item: {id: string}):Mesa | undefined {
    return mesas.find((mesa) => mesa.id && mesa.id.toString() === item.id) 
  }

  public add(item: Mesa): Mesa | undefined {
    mesas.push(item)
    return item
  }

  public update(item: Mesa): Mesa | undefined {
     const mesaIdx = mesas.findIndex((mesa) => item.id && mesa.id && mesa.id.toString() === item.id.toString())

    if (mesaIdx !== -1) {
      mesas[mesaIdx] = { ...mesas[mesaIdx], ...item }
    }
    return mesas[mesaIdx]
  }

  public delete(item: { id: string }): Mesa | undefined {
    const mesaIdx = mesas.findIndex((mesa) => mesa.id && mesa.id.toString() === item.id)

    if (mesaIdx !== -1) {
      const deletedMesas = mesas[mesaIdx]
      mesas.splice(mesaIdx, 1)
      return deletedMesas
    }
  
  }
}
