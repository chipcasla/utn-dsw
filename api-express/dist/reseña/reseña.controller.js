import { ReseñaRepository } from './reseña.data.js';
const repository = new ReseñaRepository();
function sanitizeReseñaInput(req, res, next) {
    let miPuntaje = null;
    if (typeof req.body.puntaje === 'string') {
        try {
            miPuntaje = parseInt(req.body.puntaje);
        }
        catch (error) {
            return res.status(400).json({ message: 'Error en el puntaje ingresado' });
        }
    }
    else {
        miPuntaje = req.body.puntaje;
    }
    req.body.sanitizedInput = {
        comentario: req.body.comentario,
        puntaje: miPuntaje,
        idCliente: req.body.cliente,
    };
    console.log(req.body.puntaje);
    console.log(typeof req.body.puntaje);
    if (!req.body.sanitizedInput.comentario) {
        return res.status(400).json({ message: 'Complete el comentario' });
    }
    // Verificar si puntaje es un número válido
    if (req.body.sanitizedInput.puntaje) {
        if (!Number.isInteger(req.body.sanitizedInput.puntaje) ||
            req.body.sanitizedInput.puntaje < 1 ||
            req.body.sanitizedInput.puntaje > 5) {
            return res.status(400).json({
                message: 'El puntaje debe ser un número entre 1 y 5',
            });
        }
    }
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function findAll(req, res) {
    const reseñas = await repository.findAll();
    res.json({ data: reseñas });
}
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const reseña = await repository.findOne({ id });
        if (!reseña) {
            return res.status(404).send({ error: 'Reseña no encontrada' });
        }
        res.json({ data: reseña });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: 'Error al buscar la reseña', error });
    }
}
async function findByCliente(req, res) {
    try {
        const idCliente = req.params.idCliente;
        const reseña = await repository.findByCliente(parseInt(idCliente));
        if (!reseña) {
            return res.status(404).send({ message: 'Cliente sin reseñas' });
        }
        return res.json({ data: reseña });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al buscar reseña' });
    }
}
async function add(req, res) {
    const { comentario, puntaje, idCliente } = req.body;
    if (idCliente != req.body.userId) {
        return res.status(403).send({ message: 'Reseña no autorizada' });
    }
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
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al crear la reseña', error });
    }
}
async function update(req, res) {
    const { id } = req.params;
    try {
        const miResenia = await repository.findOne({ id });
        if (miResenia?.idCliente != req.body.userId) {
            return res.status(404).send({ message: 'Reseña no encontrada' });
        }
        const reseñaActualizada = await repository.update(id, req.body.sanitizedInput);
        if (!reseñaActualizada) {
            return res.status(404).send({ message: 'Reseña no encontrada' });
        }
        res
            .status(200)
            .send({ message: 'Reseña actualizada', data: reseñaActualizada });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: 'Error al actualizar reseña', error });
    }
}
async function remove(req, res) {
    try {
        const id = req.params.id;
        const reseñaEliminada = await repository.delete({ id });
        if (reseñaEliminada == 0) {
            res.status(404).send({ error: 'Reseña no encontrada' });
        }
        else {
            res.status(200).send({ message: 'Reseña eliminada correctamente' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al eliminar reseña', error });
    }
}
export { add, findAll, findByCliente, findOne, remove, sanitizeReseñaInput, update, };
//# sourceMappingURL=rese%C3%B1a.controller.js.map