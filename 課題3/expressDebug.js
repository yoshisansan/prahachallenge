//express モジュールのインスタンス生成
const express = require('express');
const app = express();
const port = 3000;

app.get(express.json());

app.get('/', (req, res) => {
  res.send({ text: 'hello world' }); //課題１
});

app.post('/', (req, res) => {
  console.log(req.header);
  console.log(req.body);
  const cType = req.headers['content-type'];
  const data = req.body;
  res.status(201).type(cType).send(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
