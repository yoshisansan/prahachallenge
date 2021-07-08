const debug = require('debug')('express');
const express = require('express');

const users = [{ id: 0, name: 'admin' }];

const server = express();
server.use(express.json());

server.get('/users', (_, response) => response.send({ users }));
server.get('/users/:id', ({ params: { id } }, response) => {
  const user = users[id];
  response.send({ user });
});
server.post('/users', ({ body }, response) => {
  const { user } = body;
  user.id = users.length;
  users.push(user);
  response.send({ user });
});

server.listen(9999, () => console.log('API running on http://localhost:9999'));
