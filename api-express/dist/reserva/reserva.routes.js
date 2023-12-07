import { Router } from 'express';
import { add, findAll, findOne, findPendientes, remove, sanitizeReservaInput, update, } from './reserva.controller.js';
export const reservaRouter = Router();
reservaRouter.get('/', findAll);
reservaRouter.get('/:id', findOne);
reservaRouter.post('/', add);
reservaRouter.put('/:id', update);
reservaRouter.delete('/:id', remove);
reservaRouter.get('/', sanitizeReservaInput, findPendientes);
//# sourceMappingURL=reserva.routes.js.map