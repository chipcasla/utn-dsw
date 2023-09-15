import { Request, Response, NextFunction } from 'express'
import { ClienteRepository } from './cliente.repository.js'
import { Cliente } from './cliente.entity.js'

const repository = new ClienteRepository()

function findAll(req: Request, res: Response) {
  const clientes = repository.findAll()
  res.json({data: clientes})
};

function findOne(req: Request, res: Response) {
  const id = req.params.id
  const cliente = repository.findOne({ id })
  if (!cliente) {
    return res.status(404).send({ error: 'Cliente no encontrado' })
  }
  res.json({data : cliente})
  
}

function add(req: Request, res: Response) {
  const input = req.body
  const clienteInput = new Cliente(
    input.dni,
    input.nombre,
    input.apellido, 
    input.email, 
    input.telefono, 
    null) // Inicializa id como null
  const nuevoCliente = repository.add(clienteInput)
  return res.status(201).send({ message: 'Cliente creado', data: nuevoCliente })
}

function update(req: Request, res: Response) {
  const { id } = req.params
  req.body.id = id
  const clienteActualizado = repository.update(req.body)
  if (!clienteActualizado) {
    res.status(404).send({ error: 'Cliente no encontrado' })
  }
  
  return res.status(200).send({ message: 'Cliente actualizado!', data: clienteActualizado })
  
};

function remove(req: Request, res: Response) {
  const id = req.params.id
  const clienteEliminado = repository.delete({ id })
  if (!clienteEliminado) {
    res.status(404).send({ error: 'Cliente no encontrado' })
  } else {
    res.status(200).send({ message: 'Cliente eliminado correctamente' })
  }
}

export { findAll, findOne, add, update, remove }
