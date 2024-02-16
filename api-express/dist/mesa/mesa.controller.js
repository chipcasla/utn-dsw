import { ReservaRepository } from '../reserva/reserva.data.js';
import { MesaRepository } from './mesa.data.js';
const repository = new MesaRepository();
const reservaRepo = new ReservaRepository();
function sanitizeMesaInput(req, res, next) {
    req.body.sanitizedInput = {
        capacidad: req.body.capacidad,
        ubicacion: req.body.ubicacion,
    };
    const capNum = parseInt(req.body.sanitizedInput.capacidad);
    // Verificar si cantidadPersonas es un número válido
    if (isNaN(capNum)) {
        return res.status(400).json({
            message: 'La cantidad de personas debe ser un número entero',
        });
    }
    // Verificar si ubicacion es válida
    if (req.body.sanitizedInput.ubicacion.toLowerCase() != 'afuera' &&
        req.body.sanitizedInput.ubicacion.toLowerCase() != 'adentro') {
        return res
            .status(400)
            .json({ message: 'Debe ingresar ubicación: afuera o adentro' });
    }
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
function sanitizeReservaInputReservar(req, res, next) {
    const { cantidadPersonas, fechaHora, ubicacion } = req.params;
    req.body.sanitizedInputReservar = {
        fechaHora: fechaHora,
        cantidadPersonas: cantidadPersonas,
        ubicacion: ubicacion,
    };
    if (!req.body.sanitizedInputReservar.fechaHora ||
        !req.body.sanitizedInputReservar.cantidadPersonas ||
        !req.body.sanitizedInputReservar.ubicacion) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
    }
    // Verificar si cantidadPersonas es un número válido
    if (!validarCapacidad(req.body.sanitizedInputReservar.cantidadPersonas)) {
        return res.status(400).json({
            message: 'La cantidad de personas debe ser un número entre 1 y 6',
        });
    }
    // Verificar si fechaHora es una fecha y hora válidas
    if (!isValidDateTime(req.body.sanitizedInputReservar.fechaHora)) {
        return res
            .status(400)
            .json({ message: 'Debe ingresar una fecha y hora válidas' });
    }
    // Verificar si ubicacion es válida
    if (req.body.sanitizedInputReservar.ubicacion.toLowerCase() != 'afuera' &&
        req.body.sanitizedInputReservar.ubicacion.toLowerCase() != 'adentro') {
        return res
            .status(400)
            .json({ message: 'Debe ingresar ubicación: afuera o adentro' });
    }
    Object.keys(req.body.sanitizedInputReservar).forEach((key) => {
        if (req.body.sanitizedInputReservar[key] === undefined) {
            delete req.body.sanitizedInputReservar[key];
        }
    });
    next();
}
//validar capacidad
function validarCapacidad(cap) {
    const capNum = parseInt(cap);
    return !isNaN(capNum) && capNum >= 1 && capNum <= 6;
}
// Función para verificar si fechaHora es una fecha y hora válidas
function isValidDateTime(dateTimeString) {
    const dateTime = Date.parse(dateTimeString); // Intenta convertir la cadena a un objeto Date
    const [datePart, timePart] = dateTimeString.split('T');
    return !isNaN(dateTime) && datePart && timePart; // Si el resultado no es NaN, es una fecha y hora válidas
}
async function findAll(req, res) {
    const mesas = await repository.findAll();
    res.json({ data: mesas });
}
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const mesa = await repository.findOne({ id });
        if (!mesa) {
            return res.status(404).send({ error: 'Mesa no encontrada' });
        }
        res.json({ data: mesa });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al buscar la mesa', error });
    }
}
async function add(req, res) {
    const { capacidad, ubicacion } = req.body.sanitizedInput;
    const mesaInput = {
        capacidad,
        ubicacion,
    };
    try {
        const nuevaMesa = await repository.add(mesaInput);
        return res.status(201).json({ message: 'Mesa creada', data: nuevaMesa });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al crear la mesa', error });
    }
}
async function update(req, res) {
    const { id } = req.params;
    try {
        const mesaActualizada = await repository.update(id, req.body.sanitizedInput);
        if (!mesaActualizada) {
            return res.status(404).send({ error: 'Mesa no encontrada' });
        }
        res
            .status(200)
            .send({ message: 'Mesa actualizada', data: mesaActualizada });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al actualizar mesa', error });
    }
}
async function remove(req, res) {
    try {
        const id = req.params.id;
        const mesa = await repository.findOne({ id });
        if (!mesa) {
            return res.status(404).send({ error: 'Mesa no encontrada' });
        }
        if (await tieneReservasPendientes(id)) {
            return res.status(404).send({
                message: `No es posible eliminar la mesa ${id} ya que tiene reservas pendientes.`,
            });
        }
        const mesaEliminada = await repository.delete({ id });
        if (mesaEliminada == 0) {
            res.status(404).send({ error: 'Mesa no encontrada' });
        }
        else {
            res.status(200).send({ message: 'Mesa eliminada correctamente' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al eliminar mesa', error });
    }
}
async function tieneReservasPendientes(idMesa) {
    const pendientes = await reservaRepo.findPendientesMesa(parseInt(idMesa));
    if (pendientes?.length && pendientes?.length > 0) {
        return true;
    }
    return false;
}
async function findMesasLibres(req, res) {
    const { cantidadPersonas, fechaHora, ubicacion } = req.body.sanitizedInputReservar;
    const mesas = await repository.findMesasLibres(Number.parseInt(cantidadPersonas), new Date(fechaHora), ubicacion);
    if (!mesas) {
        res.json({ message: 'No hay mesas disponibles' });
    }
    else {
        res.json({ data: mesas });
    }
}
export { add, findAll, findMesasLibres, findOne, remove, sanitizeMesaInput, sanitizeReservaInputReservar, update, };
//# sourceMappingURL=mesa.controller.js.map