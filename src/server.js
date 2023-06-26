require('express-async-errors');

const AppError = require('./utils/AppError');

const express = require('express');
const app = express();

const routes = require('./routes');

app.use(express.json());
app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: AppError.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: 'error',
    message: 'internal server error'
  });
});

const PORT = 3333;

app.listen(PORT, () => {});
