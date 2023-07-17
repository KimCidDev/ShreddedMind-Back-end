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
UserRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  (request, response) => {
    console.log(request.file.filename);
    response.json();
  }
);

module.exports = UserRoutes;
