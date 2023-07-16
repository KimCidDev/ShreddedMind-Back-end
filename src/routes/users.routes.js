const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../configs/upload');

const UsersController = require('../controllers/UsersControllers');
const usersController = new UsersController();
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const UserRoutes = Router();

const upload = multer(uploadConfig.MULTER);

UserRoutes.post('/', usersController.create);
UserRoutes.put('/', ensureAuthenticated, usersController.update);
UserRoutes.patch('/avatar', ensureAuthenticated, usersController.update, (request, response) => {
  console.log(request)
});

module.exports = UserRoutes;
