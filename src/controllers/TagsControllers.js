const AppError = require('../utils/AppError');
const knex = require('../database/knex');
const { hash, compare } = require('bcryptjs');

class TagsController {
  async index(request, response) {
    const user_id = request.params;

    const tags = await knex('tags').where({ user_id });
    console.log(tags);

    return response.json({ ...tags });
  }
}

module.exports = TagsController;
