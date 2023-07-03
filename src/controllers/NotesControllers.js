const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const { user_id } = request.params;

    const [note_id] = await knex('notes').insert({
      title,
      description,
      user_id
    });

    const linksInsert = links.map(link => {
      return {
        note_id,
        url: link
      };
    });

    await knex('links').insert(linksInsert);

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      };
    });

    await knex('tags').insert(tagsInsert);

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const note = await knex('notes').where({ id }).first();
    const tags = await knex('tags').where({ note_id: id }).orderBy('name');
    const links = await knex('links')
      .where({ note_id: id })
      .orderBy('created_at');

    /* const gethour = hour => {
      const created_at = note.created_at;
      const lastEightChars = created_at.slice(-8);
      const filteredValue = lastEightChars.split(':').join('');
      hour = Number(filteredValue);

      return hour;

       console.log(gethour());
    }; */

    return response.json({ ...note, tags, links });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex('notes').where({ id }).delete();

    return response.json({ ...note, tags, links });
  }

  async index(request, response) {
    const allNotes = await knex('notes').select('*');

    return response.json({ ...allNotes });
  }
}

module.exports = NotesController;
