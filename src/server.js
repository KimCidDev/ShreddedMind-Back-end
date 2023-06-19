const express = require('express');

const app = express();
app.use(express.json());

app.get('/:id', (request, response) => {
  const { id } = request.params;

  response.send(`Eu quero comer ${id} Xis Saladas`);
});

app.get('/', (request, response) => {
  const { prato, num } = request.query;
  response.send(`Eu gosto de comer ${num} ${prato} no almoço`);
});

app.post('/users', (request, response) => {
  const { name, email } = request.body;

  response.send({ name, email });
});

const PORT = 3333;

app.listen(PORT, () =>
  console.log(`Xis salada is running on Port ${PORT} e isso não importa`)
);
