import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ClienteRepository } from './cliente.data.js';
const repository = new ClienteRepository();
function sanitizeClienteInput(req, res, next) {
    req.body.sanitizedInput = {
        tipo: req.body.tipo,
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        mail: req.body.mail,
        password: req.body.password,
    };
    // Validar el formato del DNI
    if (req.body.sanitizedInput.dni) {
        if (!validateDNI(req.body.sanitizedInput.dni)) {
            return res
                .status(400)
                .json({ message: 'El formato del DNI es incorrecto' });
        }
    }
    // Validar el formato del teléfono
    if (req.body.sanitizedInput.telefono) {
        if (!validateTelefono(req.body.sanitizedInput.telefono)) {
            return res
                .status(400)
                .json({ message: 'El formato del teléfono es incorrecto' });
        }
    }
    // Validar el formato del correo electrónico
    if (req.body.sanitizedInput.mail) {
        if (!validateEmail(req.body.sanitizedInput.mail)) {
            return res
                .status(400)
                .json({ message: 'El formato del correo electrónico es incorrecto' });
        }
    }
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
function validateDNI(dni) {
    return /^\d{8}$/.test(dni);
}
function validateTelefono(telefono) {
    return /^\d{7,14}$/.test(telefono);
}
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
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
function convertirACamelCase(str) {
    if (!str)
        return '';
    const palabras = str.split(' ');
    // Capitalizar la primera letra de cada palabra y convertir el resto a minúsculas
    const nombre = palabras
        .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
        .join(' ');
    return nombre;
}
async function add(req, res) {
    const { dni, nombre, apellido, telefono, mail, password } = req.body.sanitizedInput;
    //validar dni usuario duplicado
    const user = await repository.findByDni(dni);
    if (user) {
        return res
            .status(400)
            .json({ message: `El DNI: ${dni} ya está registrado` });
    }
    //encriptacion de contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const nombreFormato = convertirACamelCase(nombre);
    const apellidoFormato = convertirACamelCase(apellido);
    const clienteInput = {
        tipo: 'cliente',
        dni,
        nombre: nombreFormato,
        apellido: apellidoFormato,
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
        const { password, ...cliente } = clienteActualizado.dataValues;
        res.status(200).send({ message: 'Cliente actualizado', data: cliente });
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
async function findByDni(req, res) {
    const dni = req.params.dni;
    const cliente = await repository.findByDni(dni);
    if (!cliente) {
        return res.status(200).send({ message: 'Dni no registrado' });
    }
    return res.status(400).json({ message: 'Dni ya registrado' });
}
async function login(req, res) {
    const { dni, password } = req.body;
    //Validar dni
    const cliente = await repository.findByDni(dni);
    if (!cliente) {
        return res.status(400).json({ message: 'DNI no registrado' });
    }
    //Validar password
    const passwordValid = await bcrypt.compare(password, cliente.dataValues.password);
    if (!passwordValid) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    const idCliente = cliente.dataValues.id;
    const rolCliente = cliente.dataValues.tipo;
    //Generar token
    const token = jwt.sign({ id: idCliente, rol: rolCliente }, process.env.SECRET_KEY || 'troleado', {
        expiresIn: 60 * 60,
    });
    return res.status(200).json({ token, data: cliente });
}
export { add, findAll, findByDni, findOne, login, remove, sanitizeClienteInput, update };
//# sourceMappingURL=cliente.controller.js.map