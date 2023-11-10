import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ClienteRepository } from './cliente.data.js';
const repository = new ClienteRepository();
function sanitizeClienteInput(req, res, next) {
    req.body.sanitizedInput = {
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        mail: req.body.mail,
        password: req.body.password,
    };
    //more checks here
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function findAll(req, res) {
    const clientes = await repository.findAll();
    res.json({ data: clientes });
}
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const cliente = await repository.findOne({ id });
        if (!cliente) {
            return res.status(404).send({ error: 'Cliente no encontrado' });
        }
        res.json({ data: cliente });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error al buscar cliente', error });
    }
}
async function add(req, res) {
    const { dni, nombre, apellido, telefono, mail, password } = req.body.sanitizedInput;
    //encriptacion de contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const clienteInput = {
        tipo: 'cliente',
        dni,
        nombre,
        apellido,
        telefono,
        mail,
        password: hashedPassword,
    };
    try {
        const nuevoCliente = await repository.add(clienteInput);
        return res
            .status(201)
            .json({ message: 'Cliente creado', data: nuevoCliente });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: 'Error al crear el cliente', error });
    }
}
async function update(req, res) {
    const { id } = req.params;
    try {
        const clienteActualizado = await repository.update(id, req.body.sanitizedInput);
        if (!clienteActualizado) {
            return res.status(404).send({ error: 'Cliente no encontrado' });
        }
        res
            .status(200)
            .send({ message: 'Cliente actualizado', data: clienteActualizado });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: 'Error al actualizar cliente', error });
    }
}
async function remove(req, res) {
    try {
        const id = req.params.id;
        const clienteEliminado = await repository.delete({ id });
        if (clienteEliminado == 0) {
            res.status(404).send({ error: 'Cliente no encontrado' });
        }
        else {
            res.status(200).send({ message: 'Cliente eliminado correctamente' });
        }
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: 'Error al eliminar el cliente', error });
    }
}
async function login(req, res) {
    const { dni, password } = req.body;
    //Validar dni
    const cliente = await repository.findByDni(dni);
    if (!cliente) {
        return res.status(401).json({ msg: 'DNI no registrado' });
    }
    //Validar password
    const passwordValid = await bcrypt.compare(password, cliente.dataValues.password);
    if (!passwordValid) {
        return res.status(401).json({ msg: 'Contraseña incorrecta' });
    }
    //Generar token
    const token = jwt.sign({ dni: dni }, process.env.SECRET_KEY || 'troleado'); //el dni en el payload es temporal, despues hay que cambiarlo
    return res.status(200).json({ token });
}
export { add, findAll, findOne, login, remove, sanitizeClienteInput, update };
//# sourceMappingURL=cliente.controller.js.map