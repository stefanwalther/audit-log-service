const express = require('express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const pkg = require('./../package.json');

const LogsController = require('./modules/logs/logs.controller');

const HealthCheckController = require('./modules/health-check/health-check.controller');

function init(app) {
  const router = express.Router(); // eslint-disable-line new-cap
  const version = 'v1';

  router.get('/health-check', HealthCheckController.get);

  router.get(`/${version}/logs/:id`, LogsController.get);
  router.post(`/${version}/logs`, LogsController.post);

  // Swagger
  const swaggerDoc = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './config/api-docs.yml'), 'utf8'));
  swaggerDoc.info.version = pkg.version;
  app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  app.use('/', router);
}

module.exports = {
  init
};
