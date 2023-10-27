/* import { Repository } from '../shared/repository.js';
import { Localidad } from './localidad.entity.js';

const localidades = [
  new Localidad('Rosario', 1),
];
let nuevoID = 2;

export class LocalidadRepository implements Repository<Localidad> {
  public findAll(): Localidad[] | undefined {
    return localidades;
  }

  public findOne(item: { id: string }): Localidad | undefined {
    return localidades.find(
      (localidad) => localidad.id && localidad.id.toString() === item.id
    );
  }

  public add(item: Localidad): Localidad | undefined {
    item.id = nuevoID;
    nuevoID += 1;
    localidades.push(item);
    return item;
  }

  public update(item: Localidad): Localidad | undefined {
    const localidadIdx = localidades.findIndex(
      (localidad) =>
        item.id && localidad.id && localidad.id.toString() === item.id.toString()
    );

    if (localidadIdx !== -1) {
      localidades[localidadIdx] = { ...localidades[localidadIdx], ...item };
    }
    return localidades[localidadIdx];
  }

  public delete(item: { id: string }): Localidad | undefined {
    const localidadIdx = localidades.findIndex(
      (localidad) => localidad.id && localidad.id.toString() === item.id
    );

    if (localidadIdx !== -1) {
      const deletedLocalidades = localidades[localidadIdx];
      localidades.splice(localidadIdx, 1);
      return deletedLocalidades;
    }
  }
} */
