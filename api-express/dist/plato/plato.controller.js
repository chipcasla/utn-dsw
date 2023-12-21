import { PlatoRepository } from './plato.data.js';
const repository = new PlatoRepository();
function sanitizePlatoInput(req, res, next) {
    req.body.sanitizedInput = {
        ingredientes: req.body.ingredientes,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
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
async function add(req, res) {
    const { ingredientes, descripcion, imagen } = req.body.sanitizedInput;
    const platoInput = {
        ingredientes,
        descripcion,
        imagen,
    };
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
        return res.status(500).json({ message: 'Error al actualizar plato', error });
    }
}
async function remove(req, res) {
    try {
        const id = req.params.id;
        const platoEliminado = await repository.delete({ id });
        if (platoEliminado == 0) {
            res.status(404).send({ error: 'Plato no encontrado' });
        }
        else {
            res.status(200).send({ message: 'Plato eliminado correctamente' });
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
export { findAll, findOne, add, remove, update, sanitizePlatoInput };
//# sourceMappingURL=plato.controller.js.map