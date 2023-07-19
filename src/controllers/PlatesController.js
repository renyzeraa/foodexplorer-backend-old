const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class PlatesController {
  async create(request, response) {
    const { title, description, value, ingredients, categories } = request.body;
    const user_id = request.user.id;
    const picture = request.file.filename;

    if (!request.user.isAdmin) {
      console.log("Valor de request.user.isAdmin:", request.user);
      console.log("Requisição de usuário não é admin. Acesso negado.");
      return response
        .status(403)
        .json({ error: "Acesso negado, você não é o admin." });
    }

    const diskStorage = new DiskStorage();

    const filePlate = await diskStorage.saveFile(picture);

    if (!request.file) {
      throw new AppError("Faltou adicionar uma imagem pelo menos!!");
    }

    // Busca de ingredientes estáticos já criados no back-end e retornado o id
    let ingredientIds = [];
    console.log(ingredients);
    const ingredientSplit = ingredients.split(",");

    await Promise.all(
      ingredientSplit.map(async (item) => {
        const [ingredient] = await knex("ingredients")
          .where("name", item)
          .pluck("id");

        if (ingredient) {
          ingredientIds.push(ingredient);
        }
      }),
    );
    console.log("IngredientsIds => ", ingredientIds);

    // Verificar se pelo menos uma categoria foi fornecida
    if (!categories || categories.length === 0) {
      return response
        .status(400)
        .json({ error: "Não foi passado nenhuma categoria" });
    }

    // Verificar se categories é uma string
    if (typeof categories !== "string") {
      return response
        .status(400)
        .json({ error: "Categories não é uma string" });
    }

    // Obter o ID da categoria com base no nome fornecido
    const [category] = await knex("categories")
      .where("name", categories)
      .pluck("id");

    if (!category) {
      return response
        .status(400)
        .json({ error: "Não foi passado nenhuma categoria" });
    }

    // Verificar se pelo menos uma categoria válida foi encontrada
    if (category.length === 0) {
      return response
        .status(400)
        .json({ error: "Nenhuma categoria válida foi passada" });
    }

    // Erro de criação inicial por falta de parametros passados pelo cliente
    if (!title || !value || !description) {
      throw new AppError("Não foi possivel realizar a criação do prato");
    }

    // Verificar se o ID do usuário é válido
    const userExists = await knex("users").where("id", user_id).first();

    if (!userExists) {
      return response.status(400).json({ error: "ID de usuário inválido" });
    }

    // Criação do prato
    const [plate] = await knex("plates")
      .insert({
        title,
        description,
        ingredients: JSON.stringify(ingredientIds),
        value,
        picture: filePlate,
        user_id,
        category_id: category,
      })
      .returning("id");

    if (!ingredientIds || ingredientIds.length === 0) {
      return response
        .status(400)
        .json({ error: "Não foi passado nenhum ingrediente válido" });
    }

    return response.json({ plate_id: plate });
  }

  async show(request, response) {
    const plates = await knex("plates").select("*");

    return response.json(plates);
  }

  async index(request, response) {
    const { id } = request.params;

    let plates;

    if (id) {
      plates = await knex("plates").where({ id });
    } else {
      plates = await knex("plates");
    }

    return response.json(plates);
  }

  async update(request, response) {
    const { id } = request.params;
    const { title, description, value, ingredients, categories } = request.body;
    const user_id = request.user.id;

    const plate = await knex("plates").where({ id }).first();

    if (!plate) {
      return response.status(404).json({ error: "Prato não encontrado" });
    }

    if (plate.user_id !== user_id) {
      return response
        .status(403)
        .json({ error: "Acesso negado, você não é o dono deste prato" });
    }

    const diskStorage = new DiskStorage();

    if (request.file) {
      const picture = request.file.filename;
      const filePlate = await diskStorage.saveFile(picture);
      await knex("plates").where({ id }).update({ picture: filePlate });
    }

    if (title || description || value || ingredients || categories) {
      const updateData = {};

      if (title) {
        updateData.title = title;
      }

      if (description) {
        updateData.description = description;
      }

      if (value) {
        updateData.value = value;
      }

      if (ingredients) {
        const ingredientIds = [];
        const ingredientSplit = ingredients.split(",");

        await Promise.all(
          ingredientSplit.map(async (item) => {
            const [ingredient] = await knex("ingredients")
              .where("name", item)
              .pluck("id");

            if (ingredient) {
              ingredientIds.push(ingredient);
            }
          }),
        );

        updateData.ingredients = JSON.stringify(ingredientIds);
      }

      if (categories) {
        // Obter o ID da categoria com base no nome fornecido
        const [category] = await knex("categories")
          .where("name", categories)
          .pluck("id");

        if (!category) {
          return response
            .status(400)
            .json({ error: "Não foi passada nenhuma categoria" });
        }

        updateData.category_id = category;
      }

      await knex("plates").where({ id }).update(updateData);
    }
    return response.json({ success: true });
  }
}

module.exports = PlatesController;
