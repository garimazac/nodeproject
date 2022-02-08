const express = require('express');
const app = express();

//app.get('/hello', (req, res) =>
//  res.send('Hello World!'));
//
//
//const findAllMovies = (req, res) =>
//    dao.findAllMovies()
//      .then(movies => res.json(movies));
//
//app.get("/rest/movies", findAllMovies);
//
//
//const PORT = 4000;
//app.listen(PORT);

//module.exports = (app) => {
//
//  const findAllTuits = (req, res) =>
//    dao.findAllTuits()
//      .then(movies => res.json(movies));
//
//  app.get("/tuits", findAllMovies);
//
//}
//require('./tuits')(app);
//
//app.listen(4000);
//

const express = require('express');
const app = express();

app.get('/hello', (req, res) =>
  res.send('Hello World!'));

const PORT = 4000;
app.listen(PORT);
