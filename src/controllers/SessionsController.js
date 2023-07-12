const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const { compare } = require('bcryptjs');

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex('users').where({ email }).first();

    if (!user) {
      throw new AppError('Tu tá viajando. Não tem esse aí não', 404);
    }

    const passwordCheck = await compare(password, user.password);

    if (!passwordCheck) {
      throw new AppError('Tu tá viajando. Essa senha tá incorreta', 404);
    }

    return response.json({ user });
  }
}

module.exports = SessionsController;
