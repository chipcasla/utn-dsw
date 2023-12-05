import { Router } from 'express';
<<<<<<< HEAD
import { validateToken } from '../validar-token.js';
import { add, findAll, findOne, login, remove, sanitizeClienteInput, update, } from './cliente.controller.js';
=======
import { add, findAll, findOne, findByDni, login, remove, sanitizeClienteInput, update, } from './cliente.controller.js';
>>>>>>> d4a718b825a1a547c8b4fe1186e44577ff1e554b
export const clienteRouter = Router();
clienteRouter.get('/', validateToken, findAll);
clienteRouter.get('/:id', validateToken, findOne);
clienteRouter.post('/', validateToken, sanitizeClienteInput, add);
clienteRouter.put('/:id', validateToken, sanitizeClienteInput, update);
clienteRouter.delete('/:id', validateToken, remove);
clienteRouter.post('/login', login);
clienteRouter.get('/dni/:dni', findByDni);
//# sourceMappingURL=cliente.routes.js.map