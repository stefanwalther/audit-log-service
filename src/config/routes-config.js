const express = require('express');
const swaggerUi = require('swagger-ui-express');

// Routes controllers
const ApiDocsController = require('./../modules/api-docs/api-docs.controller');
const healthCheckRoutes = require('./../modules/health-check/health-check.routes');
const logsRoutes = require('../modules/audit-logs/audit-logs.routes');
const apiDocsRoutes = require('./../modules/api-docs/api-docs.routes');

const router = express.Router(); // eslint-disable-line new-cap

router.use('/', healthCheckRoutes);
router.use('/', apiDocsRoutes);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(ApiDocsController.getDocs()));
router.use('/v1/audit-logs', logsRoutes);

module.exports = router;
