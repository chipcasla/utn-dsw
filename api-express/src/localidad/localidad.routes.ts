import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './localidad.controller.js';

export const localidadRouter = Router();

localidadRouter.get('/', findAll);
localidadRouter.get('/:id', findOne);
localidadRouter.post('/', add);
localidadRouter.put('/:id', update);
localidadRouter.delete('/:id', remove);
