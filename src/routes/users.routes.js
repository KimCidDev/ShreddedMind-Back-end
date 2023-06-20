const { Router } = require('express');

const UserRoutes = Router();

UserRoutes.post('/', (request, response) => {
  const { name, email } = request.body;

  response.json({ name, email });
});

module.exports = UserRoutes;
