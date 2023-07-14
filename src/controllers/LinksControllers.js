const AppError = require('../utils/AppError');
const knex = require('../database/knex');
const { hash, compare } = require('bcryptjs');

class LinksController {
  async index(request, response) {
    const user_id = request.user.id;
    const notes = await knex('notes').select('notes.id').where({ user_id });

    const notes_id = notes[0].id;
    console.log(notes_id);

    const links = await knex('links').where({ note_id: notes_id });
    console.log(links);

    return response.json({ links });
  }
}

module.exports = LinksController;
