import { Router } from 'express';
import { validateToken } from '../validar-token.js';
import { add, findAll, findOne, findByDni, login, remove, sanitizeClienteInput, update, } from './cliente.controller.js';
export const clienteRouter = Router();
clienteRouter.get('/', validateToken, findAll);
<<<<<<< HEAD
clienteRouter.get('/:id', validateToken, findOne);
clienteRouter.post('/', sanitizeClienteInput, add);
clienteRouter.put('/:id', validateToken, sanitizeClienteInput, update);
=======
clienteRouter.get('/:id', findOne);
clienteRouter.post('/', validateToken, sanitizeClienteInput, add);
clienteRouter.put('/:id', sanitizeClienteInput, update);
>>>>>>> e094c3b56c1e7383919956fa25943856ef2064a3
clienteRouter.delete('/:id', validateToken, remove);
clienteRouter.post('/login', login);
clienteRouter.get('/dni/:dni', findByDni);
//# sourceMappingURL=cliente.routes.js.map