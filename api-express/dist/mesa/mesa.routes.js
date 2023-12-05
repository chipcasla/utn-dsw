import { Router } from 'express';
import { validateToken } from '../validar-token.js';
import { add, findAll, findMesasLibres, findOne, remove, sanitizeMesaInput, sanitizeReservaInputReservar, update, } from './mesa.controller.js';
export const mesaRouter = Router();
mesaRouter.get('/libres/:cantidadPersonas/:fechaHora/:ubicacion', sanitizeReservaInputReservar, findMesasLibres);
mesaRouter.get('/', validateToken, findAll);
mesaRouter.get('/:id', validateToken, findOne);
mesaRouter.post('/', validateToken, sanitizeMesaInput, add);
mesaRouter.put('/:id', validateToken, sanitizeMesaInput, update);
mesaRouter.delete('/:id', validateToken, remove);
//# sourceMappingURL=mesa.routes.js.map