const AppError = require('../utils/AppError');
const sqliteConnection = require('../database/sqlite');
const { hash, compare } = require('bcryptjs');

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkUserExists = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    );

    if (checkUserExists) {
      throw new AppError('Este email já está em uso.');
    }

    const hashedPassword = await hash(password, 8);

    database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
      name,
      email,
      hashedPassword
    ]);

    return response.status(201).json({});
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    console.log({ password, old_password });
    const user_id = request.user.id;

    const database = await sqliteConnection();
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [
      user_id
    ]);

    if (!user) {
      throw new AppError('usuário não existe');
    }

    const userWithUpdatedEmail = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    );

    // SE TODOS OS USUÁRIOS COM O EMAIL QUE EU ESTOU TENTANDO ATUALIZAR, E O ID DO USUÁRIO QUE EU 'TÔ TENTANDO ATUALIZAR FOR DIFERENTE DO ID DO USUÁRIO QUE EU 'TÔ TENTANDO ATUALIZAR, AÍ MOSTRE O ERRO. 'userWithUpdatedEmail pode mostrar mais de um cadastro, se houver mais de um cadastro com o mesmo email
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Este email já está em uso', 404);
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    // SE 'name' e/ou 'email' forem constantes sem conteúdo, porque o usuário não inseriu, então continue usando o valor antigo

    if (password && !old_password) {
      throw new AppError(
        'Por favor, coloque a senha que você utilizava anteriormente.'
      );
    }

    if (!password && old_password) {
      throw new AppError('Por favor, coloque a nova senha.');
    }

    if (old_password && password != old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('tu tá inventando uma senha antiga');
      } else if (checkOldPassword) {
        user.password = await hash(password, 8);
      } else {
        console.log('buraco negro');
      }

    } else if (old_password === undefined && password == undefined) {
      console.log('bom, tu sabe que esse é o caso')
    } else {
      throw new AppError('tu tá usando a mesma senha');
    }

    await database.run(
      `
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    );

    return response.status(200).json();
  }
}

module.exports = UsersController;
