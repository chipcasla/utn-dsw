import { Router } from 'express'
import { findAll, findOne, add, update, remove } from './mesa.controller.js'

export const mesaRouter = Router()


mesaRouter.get('/', findAll)
mesaRouter.get('/:id', findOne)
mesaRouter.post('/', add)
mesaRouter.put('/:id', update)
mesaRouter.delete('/:id', remove)
