import { Router } from 'express';
import { add, findAll, findMesasLibres, findOne, remove, sanitizeMesaInput, sanitizeReservaInputReservar, update, } from './mesa.controller.js';
export const mesaRouter = Router();
mesaRouter.get('/libres/:cantidadPersonas/:fechaHora/:ubicacion', sanitizeReservaInputReservar, findMesasLibres);
mesaRouter.get('/', findAll);
mesaRouter.get('/:id', findOne);
mesaRouter.post('/', sanitizeMesaInput, add);
mesaRouter.put('/:id', sanitizeMesaInput, update);
mesaRouter.delete('/:id', remove);
//# sourceMappingURL=mesa.routes.js.map