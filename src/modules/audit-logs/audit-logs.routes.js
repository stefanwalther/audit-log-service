const express = require('express');
const LogsController = require('./audit-logs.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.get('', LogsController.get);

/**
 * @swagger
 * /audit-logs/post:
 */
router.post('', LogsController.post);
router.delete('', LogsController.delete);

// /audit-logs
router.get('', LogsController.get);
// /audit-logs:id
router.get('/:id', LogsController.getById);
router.delete('/:id', LogsController.deleteById);

// /audit-logs/by-domain
router.get('/by-domain', LogsController.getByDomain);

/**
 * @swagger
 * /audit-logs/generate:
 *
 */
router.post('/generate', LogsController.generate);

module.exports = router;
