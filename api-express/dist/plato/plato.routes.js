import { Router } from 'express';
import { isAdmin } from '../validar-admin.js';
import { validateToken } from '../validar-token.js';
import { add, findAll, findOne, remove, sanitizePlatoInput, update, } from './plato.controller.js';
export const platoRouter = Router();
platoRouter.get('/', findAll);
platoRouter.get('/:id', findOne);
platoRouter.post('/', [validateToken, isAdmin, sanitizePlatoInput], add);
platoRouter.put('/:id', [validateToken, isAdmin, sanitizePlatoInput], update);
platoRouter.delete('/:id', [validateToken, isAdmin], remove);
//# sourceMappingURL=plato.routes.js.map