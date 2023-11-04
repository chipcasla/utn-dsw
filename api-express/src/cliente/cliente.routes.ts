import { Router } from 'express';
import {
  add,
  findAll,
  findOne,
  remove,
  sanitizeClienteInput,
  update,
  login
} from './cliente.controller.js';

export const clienteRouter = Router();

clienteRouter.get('/', findAll);
clienteRouter.get('/:id', findOne);
clienteRouter.post('/', sanitizeClienteInput, add);
clienteRouter.put('/:id', sanitizeClienteInput, update);
clienteRouter.delete('/:id', remove);
clienteRouter.post('/login'), login;