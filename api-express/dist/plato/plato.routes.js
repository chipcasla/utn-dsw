import { Router } from 'express';
import { add, findAll, findOne, remove, sanitizePlatoInput, update, } from './plato.controller.js';
export const platoRouter = Router();
platoRouter.get('/', findAll);
platoRouter.get('/:id', findOne);
platoRouter.post('/', sanitizePlatoInput, add);
platoRouter.put('/:id', sanitizePlatoInput, update);
platoRouter.delete('/:id', remove);
//# sourceMappingURL=plato.routes.js.map