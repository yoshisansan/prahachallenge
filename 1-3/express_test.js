const express = require('express');
const http = require('http');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Methods', "GET, POST");
//   // res.header('Access-Control-Allow-Credentials: true');
//   next();
// });

// app.use('/', (req, res, next) => {
//   const cType = req.headers['content-type'];
//   console.log(cType.indexOf('application/json'));
//   if (!cType || cType.indexOf('application/json') !== 0) return res.send(400);
//   next();
// })

  app.get('/', (req, res) => {
  res.status(200).type('application/json').json({test: 'hello world'});
});

app.post('/', (req, res) => {
  const cType = req.headers['content-type'];
  const data = req.body;
  // res.status(201).type('application/json').send(data);
  res.status(201).type(cType).send(data);
})

http.createServer(app).listen(8080, () => console.log('Example app listening on port 8080!'))