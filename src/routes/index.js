const { Router } = require('express');
const routes = Router();

const UserRoutes = require('./users.routes');

routes.use('/users', UserRoutes);

module.exports = routes;
