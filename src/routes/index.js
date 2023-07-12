const { Router } = require('express');
const routes = Router();

const UserRoutes = require('./users.routes');
const NotesRoutes = require('./notes.routes');
const TagsRoutes = require('./tags.routes');
const LinksRoutes = require('./links.routes');
const SessionsRoutes = require('./sessions.routes');

routes.use('/users', UserRoutes);
routes.use('/sessions', SessionsRoutes);
routes.use('/notes', NotesRoutes);
routes.use('/tags', TagsRoutes);
//routes.use('/links', LinksRoutes);

module.exports = routes;
