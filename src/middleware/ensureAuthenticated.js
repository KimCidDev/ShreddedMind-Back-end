const { verify } = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const authConfig = require('../configs/auth');

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  console.log('authHeader abaixo');
  console.log(authHeader);

  if (!authHeader) {
    throw new AppError('JWT Token não informado', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);
    console.log(user_id);

    request.user = {
      id: Number(user_id)
    };
    console.log('O próximo passo será chamado');
    return next();
  } catch {
    throw new AppError('JWT Token inválido', 401);
  }
}

module.exports = ensureAuthenticated;
