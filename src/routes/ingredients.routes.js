const { Router } = require('express');
const knex = require('../database/knex'); // Importe a instância do Knex configurada

const router = Router();

router.get('/', async (req, res) => {
  try {
    const ingredients = await knex('ingredients').select('name');

    res.json(ingredients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar ingredientes' });
  }
});

module.exports = router;
