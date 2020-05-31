import express = require('express');
import paramController = require('../controllers');

module.exports = (app: express.Express) => {
  app.get('/', (_req, res) => {
    res.send("Hello World");
  });

  app.post('/login/:id', async (req, res) => {
    var id = parseInt(req.params.id);
    paramController.login(id, req.body)
      .then(result => res.send(result))
      .catch(error => res.status(500).send(error));
  });
}