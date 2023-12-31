const DiskStorage = require('../providers/DiskStorage')
const AppError = require('../utils/AppError')
const knex = require('../database/knex')

class PlatesController {
  async create(req, res) {
    const { title, description, value, ingredients, category } = req.body
    const user_id = req.user.id
    const picture = req.file.filename
    const diskStorage = new DiskStorage()

    const filePlate = await diskStorage.saveFile(picture)

    if (!req.file) {
      throw new AppError('Faltou adicionar uma imagem pelo menos!!')
    }

    // Busca de ingredientes estáticos já criados no back-end e retornado o id
    let ingredientIds = []
    const ingredientSplit = ingredients.split(',')

    await Promise.all(
      ingredientSplit.map(async (item) => {
        const trimmedItem = item.trim();
        const lowerCaseItem = trimmedItem.toLowerCase();

        let [ingredient] = await knex("ingredients")
          .where("name", lowerCaseItem)
          .pluck("id");

        if (!ingredient) {
          [ingredient] = await knex("ingredients")
            .insert({ name: lowerCaseItem })
            .returning("id");
          ingredientIds.push(ingredient.id);
        }
        else {
          ingredientIds.push(ingredient);
        }
      }),
    )

    // Verificar se pelo menos uma categoria foi fornecida
    if (!category || category < 1 && category > 4) {
      return res
        .status(400)
        .json({ error: 'Categoria errada' })
    }

    // Erro de criação inicial por falta de parametros passados pelo cliente
    if (!title || !value || !description) {
      throw new AppError('Não foi possivel realizar a criação do prato')
    }

    // Formatar o valor com vírgula em valores decimais
    const formattedValue = parseFloat(
      value.replace(',', '.')
    ) /* Aqui deixa o codigo padronizado para o BRL, porem dificulta contas no back-end
     .toLocaleString(
      "pt-BR",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    ); */

    // Criação do prato
    const [plate] = await knex('plates')
      .insert({
        title,
        description,
        ingredients: JSON.stringify(ingredientIds),
        value: formattedValue,
        picture: filePlate,
        user_id,
        category_id: category
      })
      .returning('id')

    if (!ingredientIds || ingredientIds.length === 0) {
      return res
        .status(400)
        .json({ error: 'Não foi passado nenhum ingrediente válido' })
    }

    return res.json({ plate_id: plate })
  }

  async show(req, res) {
    const { id } = req.params

    const plate = await knex('plates').where('id', id).first()

    if (!plate) {
      return res.status(404).json({ error: 'Prato não encontrado' })
    }

    return res.json(plate)
  }

  async index(req, res) {
    const plates = await knex('plates').select('*')

    return res.json(plates)
  }

  async update(req, res) {
    const { id } = req.params
    const { title, description, value, ingredients, category } = req.body
    const user_id = req.user.id
    const plate = await knex('plates').where({ id }).first()

    if (!plate) {
      return res.status(404).json({ error: 'Prato não encontrado' })
    }

    if (plate.user_id !== user_id) {
      return res
        .status(403)
        .json({ error: 'Acesso negado, você não é o dono deste prato' })
    }

    const diskStorage = new DiskStorage()

    if (req.file) {
      const picture = req.file.filename
      const filePlate = await diskStorage.saveFile(picture)
      await knex('plates').where({ id }).update({ picture: filePlate })
    }

    if (title || description || value || ingredients || category) {
      const updateData = {}

      if (title) {
        updateData.title = title
      }

      if (description) {
        updateData.description = description
      }

      if (value) {
        // Formatar o valor com ponto para virgula (de 20.50 para 20,50)
        const formattedValue = value.replace(',', '.')
        updateData.value = formattedValue
      }

      if (ingredients) {
        const ingredientIds = []
        const ingredientSplit = ingredients.split(',')

        await Promise.all(
          ingredientSplit.map(async (item) => {
            const trimmedItem = item.trim();
            const lowerCaseItem = trimmedItem.toLowerCase();
    
            let [ingredient] = await knex("ingredients")
              .where("name", lowerCaseItem)
              .pluck("id");
    
            if (!ingredient) {
              [ingredient] = await knex("ingredients")
                .insert({ name: lowerCaseItem })
                .returning("id");
              ingredientIds.push(ingredient.id);
            }
            else {
              ingredientIds.push(ingredient);
            }
          }),
        )

        updateData.ingredients = JSON.stringify(ingredientIds)
      }
      updateData.category_id = category

      await knex('plates').where({ id }).update(updateData)
    }
    return res.json({ success: true })
  }

  async search(req, res) {
    const { title } = req.query

    const plates = await knex('plates')
      .where('title', 'like', `%${title}%`)
      .select('*')

    return res.json(plates)
  }

  async delete(req, res) {
    const { id } = req.params
    const user_id = req.user.id

    // Verifique se o prato existe antes de excluí-lo
    const plate = await knex('plates').where({ id }).first()

    if (!plate) {
      return res.status(404).json({ error: 'Prato não encontrado' })
    }

    // Verifique se o usuário tem permissão para excluir o prato
    if (plate.user_id !== user_id) {
      return res
        .status(403)
        .json({ error: 'Acesso negado, você não é o dono deste prato' })
    }

    // Exclua o prato do banco de dados
    await knex('plates').where({ id }).delete()

    return res.json({ success: true })
  }
}

module.exports = PlatesController
