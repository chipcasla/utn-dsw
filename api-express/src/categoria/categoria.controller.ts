import { NextFunction, Request, Response } from "express";
import { CategoriaRepository } from "./categoria.data.js";

const repository = new CategoriaRepository();

function sanitizeCategoriaInput(req: Request, res:Response, next:NextFunction){
    req.body.sanitizedInput={
        descripcion: req.body.descripcion,
    };

    if (!req.body.descripcion){
        return res.status(400).json({message: 'Complete la descripcion'})
    }

    Object.keys(req.body.sanitizedInput).forEach((key)=>{
        if(req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key];
        };
    });
    next();
}

async function findAll(req:Request, res:Response){
    const categorias = await repository.findAll();
    res.json({data: categorias});
}

async function findOne(req:Request, res:Response){
    try{
        const id = req.params.id;
        const categoria = await repository.findOne( {id} );
        if(!categoria){
            return res.status(404).send({error: 'Categoria no encontrada'});
        }
        res.json(categoria);
    } catch(error){
        return res.status(500).json({message: 'Error al buscar la categoria', error});
    }
}

async function add(req:Request, res:Response){
    const { descripcion } = req.body.sanitizedInput;
    const categoriaInput={
        descripcion,
    }
    try{
        const nuevaCategoria = await repository.add(categoriaInput);
        return res.status(201).json({message: 'Categoria añadida correctamente', data: nuevaCategoria})
    } catch(error){
        return res.status(500).json({message: 'Error al crear la categoria', error});
    }
}

async function update(req:Request, res:Response){
    const { id } = req.params;
    try{
        const categoriaActualizada = await repository.update(
            id,
            req.body.sanitizedInput
        );
        if(!categoriaActualizada){
            return res.status(404).send({error: 'Categoria no encontrada'});
        }

        return res.status(200).send({message: 'Categoria actualizada', data: categoriaActualizada});
    } catch(error) {
        return res.status(500).json({message: 'Error al actualizar categoria', error});
    }
}

async function remove(req:Request, res:Response){
    try{
        const id = req.params.id;
        const categoriaEliminada = await repository.delete({ id });
        if(categoriaEliminada == 0){
            return res.status(404).send({message: 'Categoria no encontrada'});
        }
        return res.status(200).send({message: 'Categoria eliminada correctamente'});
    } catch(error) {
        return res.status(500).json({message: 'Error al eliminar categoria', error});
    }
}

export {add, remove, update, findOne, findAll, sanitizeCategoriaInput};