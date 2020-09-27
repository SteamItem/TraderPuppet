import express = require('express');
import rollbitController from '../controllers/rollbit';
import empireController from '../controllers/empire';
import duelbitsController from '../controllers/duelbits';

module.exports = (app: express.Express) => {
  app.get('/', (_req, res) => {
    res.send("Hello World");
  });

  app.post('/login/empire', async (req, res) => {
    empireController.login(req.body)
      .then(result => res.send(result))
      .catch(error => res.status(500).send(error));
  });

  app.post('/login/rollbit', async (req, res) => {
    rollbitController.login(req.body)
      .then(result => res.send(result))
      .catch(error => res.status(500).send(error));
  });

  app.post('/login/duelbits', async (req, res) => {
    duelbitsController.login(req.body)
      .then(result => res.send(result))
      .catch(error => res.status(500).send(error));
  });
}