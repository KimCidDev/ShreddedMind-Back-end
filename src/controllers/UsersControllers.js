class UsersController {
  create(request, response) {
    const { name, email, password } = request.body;

    response.status(204).json({ name, email, password });
  }
}

module.exports = UsersController;
