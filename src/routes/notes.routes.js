const { Router } = require('express');
const NotesRoutes = Router();

const NotesController = require('../controllers/NotesControllers');
const notesController = new NotesController();

NotesRoutes.post('/:user_id', notesController.create);
NotesRoutes.get('/:id', notesController.show);
NotesRoutes.delete('/:id', notesController.delete);

module.exports = NotesRoutes;
