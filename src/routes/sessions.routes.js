const { Router } = require('express');

const SessionsController = require('../controllers/SessionsController');
const sessionsController = new SessionsController();
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const sessionRoutes = Router();

sessionRoutes.post('/', sessionsController.create);

module.exports = sessionRoutes;
