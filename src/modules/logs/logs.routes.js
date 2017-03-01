const express = require('express');
const LogsController = require('./logs.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.get('', LogsController.get);
router.post('', LogsController.post);
router.delete('', LogsController.delete);

// /logs:id
router.get('/:id', LogsController.getById);
router.delete('/:id', LogsController.deleteById);

/**
 * @swagger
 * /logs/generate:
 *
 */
router.post('/generate', LogsController.generate);

module.exports = router;
