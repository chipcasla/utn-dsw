import fs from 'fs-extra';
import { deleteImage, transformImage, uploadImage } from '../cloudinary.js';
import { PlatoRepository } from './plato.data.js';
const repository = new PlatoRepository();
function sanitizePlatoInput(req, res, next) {
    console.log(req.body);
    req.body.sanitizedInput = {
        ingredientes: req.body.ingredientes,
        descripcion: req.body.descripcion,
    };
    if (!req.body.sanitizedInput.ingredientes) {
        return res
            .status(400)
            .json({ message: 'Complete los ingredientes' });
    }
    if (!req.body.sanitizedInput.descripcion) {
        return res
            .status(400)
            .json({ message: 'Complete la descripcion' });
    }
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function findAll(req, res) {
    const platos = await repository.findAll();
    if (platos) {
        for (let plt of platos) {
            plt.dataValues.imagen_url = await transformImage(plt.dataValues.public_id);
        }
    }
    res.json({ data: platos });
}
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const plato = await repository.findOne({ id });
        if (!plato) {
            return res.status(404).send({ error: 'Plato no encontrado' });
        }
        res.json({ data: plato });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al buscar el plato', error });
    }
}
async function findByCategoria(req, res) {
    const idCategoria = req.params.id;
    const platos = await repository.findByCategoria(parseInt(idCategoria));
    res.json({ data: platos });
}
async function add(req, res) {
    const { ingredientes, descripcion } = req.body.sanitizedInput;
    const platoInput = {
        ingredientes,
        descripcion,
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
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al crear el plato', error });
    }
}
async function update(req, res) {
    const { id } = req.params;
    try {
        const platoActualizado = await repository.update(id, req.body.sanitizedInput);
        if (!platoActualizado) {
            return res.status(404).send({ error: 'Plato no encontrado' });
        }
        res
            .status(200)
            .send({ message: 'Plato actualizado', data: platoActualizado });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: 'Error al actualizar plato', error });
    }
}
async function remove(req, res) {
    try {
        const id = req.params.id;
        const platoEliminado = await repository.findOne({ id });
        const eliminados = await repository.delete({ id });
        if (eliminados == 0) {
            res.status(404).send({ error: 'Plato no encontrado' });
        }
        else {
            console.log(platoEliminado);
            if (platoEliminado &&
                platoEliminado.dataValues.public_id &&
                platoEliminado.dataValues.public_id != '') {
                await deleteImage(platoEliminado.dataValues.public_id);
            }
            res
                .status(200)
                .send({
                message: 'Plato eliminado correctamente',
                plato: platoEliminado,
            });
        }
    }
    catch (error) {
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
export { add, findAll, findByCategoria, findOne, remove, sanitizePlatoInput, update };
//# sourceMappingURL=plato.controller.js.map