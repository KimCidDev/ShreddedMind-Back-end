const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskSorage = require('../providers/diskStorage');

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFileName = request.file.filename;

    const diskSorage = new DiskSorage();

    const user = await knex('users').where({ id: user_id }).first();

    if (!user) {
      throw new AppError('Sorry, not authenticated');
    }

    if (user.avatar) {
      await diskSorage.deleteFile(user.avatar);
    }

    const fileName = await diskSorage.saveFile(avatarFileName);
    user.avatar = fileName;

    await knex('users').where({ id: user_id }).update({
      avatar: user.avatar
    });

    console.log(response, { user });
    return response.status(200).json({ user });
  }
}

module.exports = UserAvatarController;
