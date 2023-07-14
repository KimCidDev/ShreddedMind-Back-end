const { Router } = require('express');
const NotesRoutes = Router();

const NotesController = require('../controllers/NotesControllers');
const notesController = new NotesController();

const ensureAuthenticated = require('../middleware/ensureAuthenticated');

NotesRoutes.use(ensureAuthenticated);

NotesRoutes.post('/', notesController.create);
NotesRoutes.get('/:id', notesController.show);
NotesRoutes.delete('/:id', notesController.delete);
NotesRoutes.get('/', notesController.index);

module.exports = NotesRoutes;
