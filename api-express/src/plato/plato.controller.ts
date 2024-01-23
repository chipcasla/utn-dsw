import { NextFunction, Request, Response } from 'express';
import fs from 'fs-extra';
import { deleteImage, transformImage, uploadImage } from '../cloudinary.js';
import { PlatoRepository } from './plato.data.js';

const repository = new PlatoRepository();

function sanitizePlatoInput(req: Request, res: Response, next: NextFunction) {
  console.log(req.body);
  req.body.sanitizedInput = {
    ingredientes: req.body.ingredientes,
    descripcion: req.body.descripcion,
    idcategoria: req.body.categoria,
  };

  if (!req.body.sanitizedInput.ingredientes) {
    return res.status(400).json({ message: 'Complete los ingredientes' });
  }

  if (!req.body.sanitizedInput.descripcion) {
    return res.status(400).json({ message: 'Complete la descripcion' });
  }

  if (!req.body.sanitizedInput.idcategoria) {
    return res.status(400).json({ message: 'Complete la categoria' });
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findAll(req: Request, res: Response) {
  const platos = await repository.findAll();
  if (platos) {
    for (let plt of platos) {
      plt.dataValues.imagen_url = await transformImage(
        plt.dataValues.public_id
      );
    }
  }
  res.json({ data: platos });
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const plato = await repository.findOne({ id });
    if (!plato) {
      return res.status(404).send({ error: 'Plato no encontrado' });
    }
    res.json({ data: plato });
  } catch (error) {
    return res.status(500).json({ message: 'Error al buscar el plato', error });
  }
}

async function findByCategoria(req: Request, res: Response) {
  const idCategoria = req.params.id;
  const platos = await repository.findByCategoria(parseInt(idCategoria));
  res.json({ data: platos });
}

async function add(req: Request, res: Response) {
  const { ingredientes, descripcion, idcategoria } = req.body.sanitizedInput;
  const platoInput = {
    ingredientes,
    descripcion,
    idcategoria,
    imagen_url: '',
    public_id: '',
  };
  if (req.files?.imagen && !Array.isArray(req.files.imagen)) {
    const path = req.files.imagen.tempFilePath;
    const result = await uploadImage(path);
    platoInput.imagen_url = result.secure_url;
    platoInput.public_id = result.public_id;

    await fs.unlink(req.files.imagen.tempFilePath);
  }

  try {
    const nuevoPlato = await repository.add(platoInput);
    return res.status(201).json({ message: 'Plato creado', data: nuevoPlato });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el plato', error });
  }
}

async function update(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const { ingredientes, descripcion, idcategoria } = req.body.sanitizedInput;
    const miPlato = await repository.findOne({ id });
    if (!miPlato) {
      return res.status(404).send({ error: 'Plato no encontrado' });
    }
    if (req.files?.imagen && !Array.isArray(req.files.imagen)) {
      await deleteImage(miPlato.dataValues.public_id);
      const path = req.files.imagen.tempFilePath;
      const result = await uploadImage(path);
      miPlato.dataValues.imagen_url = result.secure_url;
      miPlato.dataValues.public_id = result.public_id;

      await fs.unlink(req.files.imagen.tempFilePath);
    }
    miPlato.dataValues.descripcion = descripcion;
    miPlato.dataValues.ingredientes = ingredientes;
    miPlato.dataValues.idcategoria = idcategoria;
    console.log(miPlato);
    const platoActualizado = await repository.update(id, miPlato.dataValues);
    res
      .status(200)
      .send({ message: 'Plato actualizado', data: platoActualizado });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error al actualizar plato', error });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const platoEliminado = await repository.findOne({ id });
    const eliminados = await repository.delete({ id });
    if (eliminados == 0) {
      res.status(404).send({ error: 'Plato no encontrado' });
    } else {
      console.log(platoEliminado);
      if (
        platoEliminado &&
        platoEliminado.dataValues.public_id &&
        platoEliminado.dataValues.public_id != ''
      ) {
        await deleteImage(platoEliminado.dataValues.public_id);
      }
      res.status(200).send({
        message: 'Plato eliminado correctamente',
        plato: platoEliminado,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar plato', error });
  }
}

/*async function findByFecha(req: Request, res: Response) {
    try {
      const fecha = req.params.fecha;
      const plato = await repository.findPlatoDelDia({ fecha });
      if (!plato) {
        return res.status(404).send({ error: 'Plato no encontrado' });
      }
      res.json({ data: plato });
    } catch (error) {
      return res.status(500).json({ message: 'Error al buscar el plato', error });
    }
  }*/

export {
  add,
  findAll,
  findByCategoria,
  findOne,
  remove,
  sanitizePlatoInput,
  update,
};
