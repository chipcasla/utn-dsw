import { Router } from 'express';
import { isAdmin } from '../validar-admin.js';
import { validateToken } from '../validar-token.js';
import {
  add,
  findAll,
  findByUser,
  findOne,
  findPendientes,
  remove,
  sanitizeReservaInput,
  update,
} from './reserva.controller.js';

export const reservaRouter = Router();

reservaRouter.get('/', [validateToken, isAdmin], findAll);
reservaRouter.get('/pendientes', [validateToken, isAdmin], findPendientes);
reservaRouter.get('/id/:idCliente', validateToken, findByUser);
reservaRouter.get('/:id', validateToken, findOne);
reservaRouter.post('/', [validateToken, sanitizeReservaInput], add);
reservaRouter.put('/:id', [validateToken, sanitizeReservaInput], update);
reservaRouter.delete('/:id', validateToken, remove);
