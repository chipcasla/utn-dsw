import { NextFunction, Request, Response } from 'express';
import { MesaRepository } from './mesa.data.js'

const repository = new MesaRepository();

function sanitizeMesaInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    capacidad: req.body.capacidad,
    ubicacion: req.body.ubicacion,
  };
  //more checks here

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findAll(req: Request, res: Response) {
  const mesas = await repository.findAll();
  res.json({ data: mesas });
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const mesa = await repository.findOne({ id });
    if (!mesa) {
      return res.status(404).send({ error: 'Mesa no encontrada' });
    }
    res.json({ data: mesa });
  } catch (error) {
    return res.status(500).json({ message: 'Error al buscar la mesa', error });
  }
}

async function add(req: Request, res: Response) {
  const { capacidad, ubicacion } = req.body.sanitizedInput;
  const mesaInput = {
    capacidad,
    ubicacion,
  };
  try {
    const nuevaMesa = await repository.add(mesaInput);
    return res.status(201).json({ message: 'Mesa creada', data: nuevaMesa });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear la mesa', error });
  }
}

async function update(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const mesaActualizada = await repository.update(
      id,
      req.body.sanitizedInput
    );
    if (!mesaActualizada) {
      return res.status(404).send({ error: 'Mesa no encontrada' });
    }
    res
      .status(200)
      .send({ message: 'Mesa actualizada', data: mesaActualizada });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar mesa', error });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const mesaEliminada = await repository.delete({ id });
    if (mesaEliminada == 0) {
      res.status(404).send({ error: 'Mesa no encontrada' });
    } else {
      res.status(200).send({ message: 'Mesa eliminada correctamente' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar mesa', error });
  }
}

async function findMesasLibres(req:Request, res:Response){
  const{cantidadPersonas, fechaHora, ubicacion} = req.body

  const mesas=await repository.findMesasLibres(cantidadPersonas, fechaHora, ubicacion)

  if (!mesas){
    res.json('No hay mesas disponibles')
  }else{
    res.json({data: mesas})
  }
}
  


export { add, findAll, findOne, remove, sanitizeMesaInput, update, findMesasLibres };
