const { Router } = require('express');
const linksRoutes = Router();

const LinksController = require('../controllers/LinksControllers');
const linksController = new LinksController();

const ensureAuthenticated = require('../middleware/ensureAuthenticated');

linksRoutes.get('/', ensureAuthenticated, linksController.index);

module.exports = linksRoutes;
