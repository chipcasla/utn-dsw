import { Router } from "express";
import {
    add,
    remove,
    update,
    findOne,
    findAll,
    sanitizeCategoriaInput
} from "../categoria/categoria.controller.js";

export const categoriaRouter = Router();

categoriaRouter.get('/', findAll);
categoriaRouter.get('/:id', findOne);
categoriaRouter.post('/', sanitizeCategoriaInput, add);
categoriaRouter.put('/:id', sanitizeCategoriaInput, update);
categoriaRouter.delete('/:id', remove);