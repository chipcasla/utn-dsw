import { NextFunction, Request, Response } from 'express';
import { ReseñaRepository } from './reseña.data.js';

const repository = new ReseñaRepository();

function sanitizeReseñaInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    comentario: req.body.comentario,
    puntaje: req.body.puntaje,
    idCliente: req.body.cliente,
  };
  /*
  if (
    !req.body.sanitizedInput.comentario ||
    !req.body.sanitizedInput.puntaje
  ) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  // Verificar si puntaje es un número válido
  if (
    !Number.isInteger(req.body.sanitizedInput.puntaje) ||
    req.body.sanitizedInput.puntaje < 1 ||
    req.body.sanitizedInput.puntaje > 5
  ) {
    return res
      .status(400)
      .json({
        message: 'El puntaje debe ser un número entre 1 y 5',
      });
  }*/
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findAll(req: Request, res: Response) {
  const reseñas = await repository.findAll();
  res.json({ data: reseñas });
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const reseña = await repository.findOne({ id });
    if (!reseña) {
      return res.status(404).send({ error: 'Reseña no encontrada' });
    }
    res.json({ data: reseña });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error al buscar la reseña', error });
  }
}

async function findByCliente(req: Request, res: Response){
  try{
    const idCliente = req.params.idCliente;

    const reseña = await repository.findByCliente(parseInt(idCliente))
    if(!reseña){
      return res.status(404).send({msg: 'Cliente sin reseñas'})
    }
    return res.json({data: reseña})
  } catch(error){
    return res.status(500).json({message: 'Error al buscar reseña'})
  }
}

async function add(req: Request, res: Response) {
  const { comentario, puntaje, idCliente} =
    req.body.sanitizedInput;
  const reseñaInput = {
    comentario,
    puntaje,
    idCliente,
  };
  console.log(reseñaInput);
  try {
    const nuevaReseña = await repository.add(reseñaInput);
    return res
      .status(201)
      .json({ message: 'Reseña creada', data: nuevaReseña });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error al crear la reseña', error });
  }
}

async function update(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const reseñaActualizada = await repository.update(
      id,
      req.body.sanitizedInput
    );
    if (!reseñaActualizada) {
      return res.status(404).send({ error: 'Reseña no encontrada' });
    }
    res
      .status(200)
      .send({ message: 'Reseña actualizada', data: reseñaActualizada });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error al actualizar reseña', error });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const reseñaEliminada = await repository.delete({ id });
    if (reseñaEliminada == 0) {
      res.status(404).send({ error: 'Reseña no encontrada' });
    } else {
      res.status(200).send({ message: 'Reseña eliminada correctamente' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error al eliminar reseña', error });
  }
}

export {
  add,
  findAll,
  findOne,
  remove,
  sanitizeReseñaInput,
  update,
  findByCliente
};

