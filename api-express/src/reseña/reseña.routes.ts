import { Router } from 'express';
import {
  add,
  findAll,
  findOne,
  remove,
  sanitizeReseñaInput,
  update,
} from './reseña.controller.js';

export const reseñaRouter = Router();

reseñaRouter.get('/', findAll);
reseñaRouter.get('/:id', findOne);
reseñaRouter.post('/', sanitizeReseñaInput, add);
reseñaRouter.put('/:id', sanitizeReseñaInput, update);
reseñaRouter.delete('/:id', remove);
