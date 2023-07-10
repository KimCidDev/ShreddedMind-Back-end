const { Router } = require('express');
const TagsRoutes = Router();

const TagsController = require('../controllers/TagsControllers');
const tagsController = new TagsController();

TagsRoutes.get('/:user_id', tagsController.index);

module.exports = TagsRoutes;
