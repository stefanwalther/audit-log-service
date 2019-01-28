const AuditLogsModel = require('./audit-logs.model').Model;
const ExpressResult = require('express-result');

class AuditLogsController {

  // Todo: Test
  // Todo: Auth, RBAC
  static post(req, res) {
    return AuditLogsModel
      .create(req.body)
      .then(result => ExpressResult.created(res, result))
      .catch(err => ExpressResult.error(res, err));
  }

  // Todo: Test
  // Todo: Auth, RBAC
  static get(req, res) {
    return AuditLogsModel
      .find()
      .sort({ts: -1})
      .exec()
      .then(result => ExpressResult.ok(res, result))
      .catch(err => ExpressResult.error(res, err));
  }

  // Todo: Test
  static getByDomain(req, res) {
    return AuditLogsModel
      .find({
        event_domain: req.body.event_domain,
        user_id: req.body.user_id
      })
      .exec()
      .then(result => ExpressResult.ok(res, result))
      .catch(err => ExpressResult.error(res, err));
  }

  // Todo: Test
  // Todo: Auth
  static getById(req, res) {
    return AuditLogsModel
      .findById(req.params.id)
      .exec()
      .then(result => ExpressResult.ok(res, result))
      .catch(err => ExpressResult.error(res, err));
  }

  // Todo: Test
  // Todo: Auth (only tenant_admin)
  static deleteById(req, res) {
    return AuditLogsModel
      .findByIdAndRemove(req.params.id)
      .exec()
      .then(result => ExpressResult.ok(res, result))
      .catch(err => ExpressResult.error(res, err));
  }

  // Todo: Test
  // Todo: Auth (only admins)
  static delete(req, res) {
    return AuditLogsModel
      .deleteMany({})
      .exec()
      .then(result => ExpressResult.ok(res, result))
      .catch(err => ExpressResult.error(res, err));
  }

  // Todo: Test
  // Todo: Auth (only admins)
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
