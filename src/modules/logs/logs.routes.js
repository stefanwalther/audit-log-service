const express = require('express');
const router = express.Router();
const LogsController = require('./logs.controller');

// /logs
router.get('', LogsController.get);
router.post('', LogsController.post);
router.delete('', LogsController.delete);

// /logs:id
router.get('/:id', LogsController.getById);
router.delete('/:id', LogsController.deleteById);

// /log/generate
router.post('/generate', LogsController.generate);

module.exports = router;
