const express = require('express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const pkg = require('./../../package.json');

const LogsController = require('./../modules/logs/logs.controller');

const healthCheckRoutes = require('./../modules/health-check/health-check.routes.js');

function init(app) {
  const router = express.Router(); // eslint-disable-line new-cap
  const version = 'v1';

  app.use('/', healthCheckRoutes);

  // logs
  router.get(`/${version}/logs`, LogsController.get);
  router.post(`/${version}/logs`, LogsController.post);
  router.delete(`/${version}/logs`, LogsController.delete);

  // logs:id
  router.get(`/${version}/logs/:id`, LogsController.getById);
  router.delete(`/${version}/logs/:id`, LogsController.deleteById);

  // logs/generate
  router.post(`/${version}/logs/generate`, LogsController.generate);

  // Swagger
  const swaggerDoc = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './api-docs.yml'), 'utf8'));
  swaggerDoc.info.version = pkg.version;
  app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  app.use('/', router);
}

module.exports = {
  init
};
