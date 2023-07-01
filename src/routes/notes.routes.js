const { Router } = require('express');
const NotesRoutes = Router();

const NotesController = require('../controllers/NotesControllers');
const notesController = new NotesController();

NotesRoutes.post('/:user_id', notesController.create);

module.exports = NotesRoutes;
