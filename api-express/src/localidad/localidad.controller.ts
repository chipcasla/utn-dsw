import { Request, Response, NextFunction } from 'express';
import { LocalidadRepository } from './localidad.repository.js';
import { Localidad } from './localidad.entity.js';

const repository = new LocalidadRepository();

function findAll(req: Request, res: Response) {
  const localidades = repository.findAll();
  res.json({ data: localidades });
}

function findOne(req: Request, res: Response) {
  const id = req.params.id;
  const localidad = repository.findOne({ id });
  if (!localidad) {
    return res.status(404).send({ error: 'Localidad no encontrada' });
  }
  res.json({ data: localidad });
}

function add(req: Request, res: Response) {
  const { descripcion } = req.body;
  const localidadInput = new Localidad(
    descripcion,
    null
  ); // Inicializa id como null
  const nuevaLocalidad = repository.add(localidadInput);
  return res
    .status(201)
    .send({ message: 'Localidad creada', data: nuevaLocalidad });
}

function update(req: Request, res: Response) {
  const { id } = req.params;
  req.body.id = Number.parseInt(id);
  const localidadActualizada = repository.update(req.body);
  if (!localidadActualizada) {
    res.status(404).send({ error: 'Localidad no encontrada' });
  }

  return res
    .status(200)
    .send({ message: 'Localidad actualizada!', data: localidadActualizada });
}

function remove(req: Request, res: Response) {
  const id = req.params.id;
  const localidadEliminada = repository.delete({ id });
  if (!localidadEliminada) {
    res.status(404).send({ error: 'Localidad no encontrada' });
  } else {
    res.status(200).send({ message: 'Localidad eliminada correctamente' });
  }
}

export { findAll, findOne, add, update, remove };