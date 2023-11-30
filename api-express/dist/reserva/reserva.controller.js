import { ReservaRepository } from './reserva.data.js';
const repository = new ReservaRepository();
function sanitizeReservaInput(req, res, next) {
    req.body.sanitizedInput = {
        fechaHora: req.body.fechaHora,
        cantidadPersonas: req.body.cantidadPersonas,
        estado: req.body.estado,
        idCliente: req.body.cliente,
        Mesas: req.body.Mesas,
    };
    //more checks here
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function findAll(req, res) {
    const reservas = await repository.findAll();
    res.json({ data: reservas });
}
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const reserva = await repository.findOne({ id });
        if (!reserva) {
            return res.status(404).send({ error: 'Reserva no encontrada' });
        }
        res.json({ data: reserva });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: 'Error al buscar la reserva', error });
    }
}
async function add(req, res) {
    const { fechaHora, cantidadPersonas, estado, idCliente, Mesas } = req.body.sanitizedInput;
    const reservaInput = {
        fechaHora,
        cantidadPersonas,
        estado,
        idCliente,
        Mesas,
    };
    try {
        const nuevaReserva = await repository.add(reservaInput);
        return res
            .status(201)
            .json({ message: 'Reserva creada', data: nuevaReserva });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: 'Error al crear la reserva', error });
    }
}
async function update(req, res) {
    const { id } = req.params;
    try {
        const reservaActualizada = await repository.update(id, req.body.sanitizedInput);
        if (!reservaActualizada) {
            return res.status(404).send({ error: 'Reserva no encontrada' });
        }
        res
            .status(200)
            .send({ message: 'Reserva actualizada', data: reservaActualizada });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: 'Error al actualizar reserva', error });
    }
}
async function remove(req, res) {
    try {
        const id = req.params.id;
        const reservaEliminada = await repository.delete({ id });
        if (reservaEliminada == 0) {
            res.status(404).send({ error: 'Reserva no encontrada' });
        }
        else {
            res.status(200).send({ message: 'Reserva eliminada correctamente' });
        }
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: 'Error al eliminar reserva', error });
    }
}
async function findPendientes(req, res) {
    const reservas = await repository.findPendientes();
    if (!reservas) {
        res.json('No hay reservas pendientes');
    }
    else {
        res.json({ data: reservas });
    }
}
export { add, findAll, findOne, remove, sanitizeReservaInput, update, findPendientes };
//# sourceMappingURL=reserva.controller.js.map