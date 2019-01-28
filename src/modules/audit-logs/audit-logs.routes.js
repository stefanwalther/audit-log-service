const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap

const LogsController = require('./audit-logs.controller');
const verifyJwtToken = require('../../middleware/verifyJwtToken');

router.get('', LogsController.get);

/**
 * @swagger
 * /audit-logs/post:
 */
router.post('', LogsController.post); // Todo: I guess this should be '/' instead of ''
router.delete('', LogsController.delete); // Todo: I guess this should be '/' instead of ''

// /audit-logs
// Todo (AAA): Should be for the current tenant and should include some RBAC ...
router.get('', verifyJwtToken, LogsController.get); // Todo: I guess this should be '/' instead of ''

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
