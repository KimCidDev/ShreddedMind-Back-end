const { Router } = require('express');
const TagsRoutes = Router();

const TagsController = require('../controllers/TagsControllers');
const tagsController = new TagsController();

const ensureAuthenticated = require('../middleware/ensureAuthenticated');

TagsRoutes.get('/', ensureAuthenticated, tagsController.index);

module.exports = TagsRoutes;
