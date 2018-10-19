const AuditLogsModel = require('./audit-logs.model').Model;
const ExpressResult = require('express-result');

class AuditLogsController {

  static post(req, res) {
    return AuditLogsModel
      .create(req.body)
      .then(result => ExpressResult.created(res, result))
      .catch(err => ExpressResult.error(res, err));
  }

  static get(req, res) {
    return AuditLogsModel
      .find()
      .exec()
      .then(result => ExpressResult.ok(res, result))
      .catch(err => ExpressResult.error(res, err));
  }

  static getById(req, res) {
    return AuditLogsModel
      .findById(req.params.id)
      .exec()
      .then(result => ExpressResult.ok(res, result))
      .catch(err => ExpressResult.error(res, err));
  }

  static deleteById(req, res) {
    return AuditLogsModel
      .findByIdAndRemove(req.params.id)
      .exec()
      .then(result => ExpressResult.ok(res, result))
      .catch(err => ExpressResult.error(res, err));
  }

  static delete(req, res) {
    return AuditLogsModel
      .remove({})
      .exec()
      .then(result => ExpressResult.ok(res, result))
      .catch(err => ExpressResult.error(res, err));
  }

  static generate(req, res) {
    return AuditLogsModel
      .generate({
        amount: 100
      })
      .then(result => ExpressResult.created(res, result))
      .catch(err => ExpressResult.error(res, err));
  }
}

module.exports = AuditLogsController;
