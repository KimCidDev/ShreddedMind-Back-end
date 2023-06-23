const { Router } = require('express');

const UsersController = require('../controllers/UsersControllers');
const usersController = new UsersController();

const UserRoutes = Router();

UserRoutes.post('/', usersController.create);

module.exports = UserRoutes;
