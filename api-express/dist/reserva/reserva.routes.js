import { Router } from 'express';
import { validateToken } from '../validar-token.js';
import { add, findAll, findOne, remove, sanitizeReservaInput, update, } from './reserva.controller.js';
export const reservaRouter = Router();
<<<<<<< HEAD
reservaRouter.get('/', validateToken, findAll);
reservaRouter.get('/:id', validateToken, findOne);
reservaRouter.post('/', validateToken, sanitizeReservaInput, add);
reservaRouter.put('/:id', validateToken, sanitizeReservaInput, update);
reservaRouter.delete('/:id', validateToken, remove);
=======
reservaRouter.get('/', findAll);
reservaRouter.get('/:id', findOne);
reservaRouter.post('/', sanitizeReservaInput, add);
reservaRouter.put('/:id', update);
reservaRouter.delete('/:id', remove);
reservaRouter.get('/', sanitizeReservaInput, findPendientes);
>>>>>>> d4a718b825a1a547c8b4fe1186e44577ff1e554b
//# sourceMappingURL=reserva.routes.js.map