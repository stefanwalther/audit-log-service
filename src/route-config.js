const express = require('express');

const HealthCheckController = require('./modules/health-check/health-check.controller');

function init(app) {
  const router = express.Router(); // eslint-disable-line new-cap
  // const version = 'v1';

  router.get('/health-check', HealthCheckController.get);

  app.use('/', router);
}

module.exports = {
  init
};
