const { Router } = require('express');

const UsersController = require('../controllers/UsersControllers');
const usersController = new UsersController();
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const UserRoutes = Router();

UserRoutes.post('/', usersController.create);
UserRoutes.put('/', ensureAuthenticated, usersController.update);

module.exports = UserRoutes;
