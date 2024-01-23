import { Router } from 'express';
import fileUpload from 'express-fileupload';
import { isAdmin } from '../validar-admin.js';
import { validateToken } from '../validar-token.js';
import { add, findAll, findByCategoria, findOne, remove, sanitizePlatoInput, update, } from './plato.controller.js';
export const platoRouter = Router();
platoRouter.get('/', findAll);
platoRouter.get('/:id', findOne);
platoRouter.get('/categoria/:id', findByCategoria);
platoRouter.post('/', [
    validateToken,
    isAdmin,
    fileUpload({
        useTempFiles: true,
        tempFileDir: './uploads',
    }),
    sanitizePlatoInput,
], add);
platoRouter.put('/:id', [
    validateToken,
    isAdmin,
    fileUpload({
        useTempFiles: true,
        tempFileDir: './uploads',
    }),
    sanitizePlatoInput,
], update);
platoRouter.delete('/:id', [validateToken, isAdmin], remove);
//# sourceMappingURL=plato.routes.js.map