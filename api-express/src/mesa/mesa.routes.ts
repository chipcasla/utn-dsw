import { Router } from 'express';
import { isAdmin } from '../validar-admin.js';
import { validateToken } from '../validar-token.js';
import {
  add,
  findAll,
  findMesasLibres,
  findOne,
  remove,
  sanitizeMesaInput,
  sanitizeReservaInputReservar,
  update,
} from './mesa.controller.js';

export const mesaRouter = Router();
mesaRouter.get(
  '/libres/:cantidadPersonas/:fechaHora/:ubicacion',
  sanitizeReservaInputReservar,
  findMesasLibres
);
mesaRouter.get('/', validateToken, findAll);
mesaRouter.get('/:id', validateToken, findOne);
mesaRouter.post('/', [validateToken, isAdmin, sanitizeMesaInput], add);
mesaRouter.put('/:id', [validateToken, isAdmin, sanitizeMesaInput], update);
mesaRouter.delete('/:id', [validateToken, isAdmin], remove);
