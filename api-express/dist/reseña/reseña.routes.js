import { Router } from 'express';
import { validateToken } from '../validar-token.js';
import { add, findAll, findByCliente, findOne, remove, sanitizeReseñaInput, update, } from './reseña.controller.js';
export const reseñaRouter = Router();
reseñaRouter.get('/', findAll);
reseñaRouter.get('/:id', findOne);
reseñaRouter.get('/id/:idCliente', validateToken, findByCliente);
reseñaRouter.post('/', [validateToken, sanitizeReseñaInput], add);
reseñaRouter.put('/:id', [validateToken, sanitizeReseñaInput], update);
reseñaRouter.delete('/:id', validateToken, remove);
//# sourceMappingURL=rese%C3%B1a.routes.js.map