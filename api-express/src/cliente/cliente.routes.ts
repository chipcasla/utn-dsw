import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './cliente.controller.js';

export const clienteRouter = Router();

clienteRouter.get('/', findAll);
clienteRouter.get('/:id', findOne);
clienteRouter.post('/', add);
clienteRouter.put('/:id', update);
clienteRouter.delete('/:id', remove);
