const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite');
const { hash, compare } = require('bcryptjs');

class UsersController {
  async create(request, response) {
    const { title, description } = request.body;

    response.json({ title, description });
  }
}
