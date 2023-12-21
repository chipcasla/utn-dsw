import { Categoria } from "./categoria.model";
import { Plato } from "../plato/plato.model";

export class CategoriaRepository {
    
    public async findAll(): Promise<Categoria[] | undefined> {
        try{
            const categorias = await Categoria.findAll();
            return categorias;
        } catch(error) {
            throw error;
        }
    }

    public async findOne(item: {id: string}): Promise <Categoria | undefined>{
        try{
            const categoria = await Categoria.findByPk(parseInt(item.id));
            if(!categoria) {
                return undefined;
            }
            return categoria;
        } catch(error) {
            throw error;
        }
    }

    public async add(item: any): Promise<Categoria | undefined>{
        try{
            const nuevaCategoria = await Categoria.create(item);
            return nuevaCategoria
        } catch(error) {
            throw error;
        }
    }

    public async update(id: string, item: any): Promise<Categoria | undefined> {
        try {
          await Categoria.update(item, {
            where: {
              id: Number.parseInt(id),
            },
          });
          const categoriaActualizada = await this.findOne({ id });
          return categoriaActualizada;
        } catch (error) {
          throw error;
        }
    }

    public async delete(item: { id: string }): Promise<number> {
        try {
          const eliminadas = await Categoria.destroy({
            where: {
              id: parseInt(item.id),
            },
          });
          return eliminadas;
        } catch (error) {
          throw error;
        }
    }
}