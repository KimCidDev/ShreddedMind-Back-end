const { Router } = require('express');
const notesRoutes = Router();

const notesController = require('../controllers/NotesControllers');
const NotesController = notesController();

notesRoutes.use('/:id', NotesController);

module.exports = notesRoutes;
