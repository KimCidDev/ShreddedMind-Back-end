const knex = require('../database/knex');
const AppError = require('../utils/AppError');

const DiskStorage = require('../providers/diskStorage');

class UsersAvatarControllers {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFileName = request.file.filename;

    const user = await knex('users').where({ id: user_id }).first();

    const diskStorage = new DiskStorage();

    if (!user) {
      throw new AppError('Desculpe, usuário não informado', 401);
    }

    // Aqui eu tinha feito 'if (user)', mas na verdade o correto é verificar se há foto já salva para o usuário, então 'if (user.avatar)';

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    const fileName = await diskStorage.saveFile(avatarFileName);

    user.avatar = fileName;

    await knex('users').update(user).where({ id: user_id });

    response.json({ user });
  }
}

module.exports = UsersAvatarControllers;
