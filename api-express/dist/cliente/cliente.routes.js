import { Router } from 'express';
import { add, findAll, findOne, findByDni, login, remove, sanitizeClienteInput, update, } from './cliente.controller.js';
export const clienteRouter = Router();
clienteRouter.get('/', findAll);
clienteRouter.get('/:id', findOne);
clienteRouter.post('/', sanitizeClienteInput, add);
clienteRouter.put('/:id', sanitizeClienteInput, update);
clienteRouter.delete('/:id', remove);
clienteRouter.post('/login', login);
clienteRouter.get('/dni/:dni', findByDni);
//# sourceMappingURL=cliente.routes.js.map