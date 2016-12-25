const express = require('express');
const LogsController = require('./modules/logs/logs.controller');

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./config/api-docs.json');

const HealthCheckController = require('./modules/health-check/health-check.controller');

function init(app) {
  const router = express.Router(); // eslint-disable-line new-cap
  const version = 'v1';

  router.get('/health-check', HealthCheckController.get);

  router.post(`/${version}/logs`, LogsController.post);

  // Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  app.use('/', router);
}

module.exports = {
  init
};
