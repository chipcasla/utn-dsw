import { Router } from 'express';
import { validateToken } from '../validar-token.js';
import { add, findAll, findByUser, findOne, remove, sanitizeReservaInput, update, } from './reserva.controller.js';
export const reservaRouter = Router();
reservaRouter.get('/', validateToken, findAll);
reservaRouter.get('/id/:idCliente', validateToken, findByUser);
reservaRouter.get('/:id', validateToken, findOne);
reservaRouter.post('/', validateToken, sanitizeReservaInput, add);
reservaRouter.put('/:id', validateToken, sanitizeReservaInput, update);
reservaRouter.delete('/:id', validateToken, remove);
//# sourceMappingURL=reserva.routes.js.map