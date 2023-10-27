import { Router } from 'express';
import {
  add,
  findAll,
  findOne,
  remove,
  sanitizeMesaInput,
  update,
} from './mesa.controller.js';

export const mesaRouter = Router();

mesaRouter.get('/', findAll);
mesaRouter.get('/:id', findOne);
mesaRouter.post('/', sanitizeMesaInput, add);
mesaRouter.put('/:id', sanitizeMesaInput, update);
mesaRouter.delete('/:id', remove);
