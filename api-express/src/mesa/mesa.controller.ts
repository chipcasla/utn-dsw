import { Request, Response, NextFunction } from 'express';
import { MesaRepository } from './mesa.repository.js';
import { Mesa } from './mesa.entity.js';

const repository = new MesaRepository();

function findAll(req: Request, res: Response) {
  const mesas = repository.findAll();
  res.json({ data: mesas });
}

function findOne(req: Request, res: Response) {
  const id = req.params.id;
  const cliente = repository.findOne({ id });
  if (!cliente) {
    return res.status(404).send({ error: 'Cliente no encontrado' });
  }
  res.json({ data: cliente });
}

function add(req: Request, res: Response) {
  const input = req.body;
  const mesaInput = new Mesa(
    null,
    input.capacidad,
    input.estado,
    input.ubicacion
  );
  const nuevaMesa = repository.add(mesaInput);
  return res.status(201).send({ message: 'Mesa creada', data: nuevaMesa });
}

function update(req: Request, res: Response) {
  const { id } = req.params;
  req.body.id = Number.parseInt(id);
  const mesaActualizada = repository.update(req.body);
  if (!mesaActualizada) {
    res.status(404).send({ error: 'Mesa no encontrada' });
  }

  return res
    .status(200)
    .send({ message: 'Mesa actualizada!', data: mesaActualizada });
}

function remove(req: Request, res: Response) {
  const id = req.params.id;
  const mesaEliminada = repository.delete({ id });
  if (!mesaEliminada) {
    res.status(404).send({ error: 'Mesa no encontrada' });
  } else {
    res.status(200).send({ message: 'Mesa eliminada correctamente' });
  }
}

export { findAll, findOne, add, update, remove };
