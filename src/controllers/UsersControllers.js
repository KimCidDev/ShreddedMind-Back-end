const AppError = require('../utils/AppError');

class UsersController {
  create(request, response) {
    const { name, email, password } = request.body;

    if (!name) {
      throw new AppError(
        'O nome é Xis Salada ou outro que você escolher, mas pelo menos Xis Salada é obrigatório'
      );
    }

    response.status(201).json({ name, email, password });
  }
}

module.exports = UsersController;
