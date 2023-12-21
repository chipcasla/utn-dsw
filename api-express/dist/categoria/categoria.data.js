import { Categoria } from "./categoria.model.js";
export class CategoriaRepository {
    async findAll() {
        try {
            const categorias = await Categoria.findAll();
            return categorias;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(item) {
        try {
            const categoria = await Categoria.findByPk(parseInt(item.id));
            if (!categoria) {
                return undefined;
            }
            return categoria;
        }
        catch (error) {
            throw error;
        }
    }
    async add(item) {
        try {
            const nuevaCategoria = await Categoria.create(item);
            return nuevaCategoria;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, item) {
        try {
            await Categoria.update(item, {
                where: {
                    id: Number.parseInt(id),
                },
            });
            const categoriaActualizada = await this.findOne({ id });
            return categoriaActualizada;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(item) {
        try {
            const eliminadas = await Categoria.destroy({
                where: {
                    id: parseInt(item.id),
                },
            });
            return eliminadas;
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=categoria.data.js.map