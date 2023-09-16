const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require('../configs/upload');

const UsersController = require('../controllers/UsersControllers');
const usersController = new UsersController();
const UsersAvatarController = require('../controllers/UsersAvatarControllers');
const usersAvatarController = new UsersAvatarController();

const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const UserRoutes = Router();

const upload = multer(uploadConfig.MULTER);

UserRoutes.post('/', usersController.create);
UserRoutes.put('/', ensureAuthenticated, usersController.update);
UserRoutes.patch(
  '/profile',
  ensureAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update
);

module.exports = UserRoutes;
