const knex = require('knex');

const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite');
const { hash, compare } = require('bcryptjs');

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const { user_id } = request.params;

    

    console.log(typeof title);

    return response.json({ title, description, tags, links });
  }
}

module.exports = NotesController;
