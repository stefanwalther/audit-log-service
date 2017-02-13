const LogsModel = require('./logs.model').Model;
const ResStatus = require('./../../helpers/res-status');

class LogsController {

  static post(req, res) {
    return LogsModel
      .create(req.body)
      .then(result => ResStatus.created(res, result))
      .catch(err => ResStatus.error(res, err));
  }

  static get(req, res) {
    return LogsModel
      .find()
      .exec()
      .then(result => ResStatus.ok(res, result))
      .catch(err => ResStatus.error(res, err));
  }

  static getById(req, res) {
    return LogsModel
      .findById(req.params.id)
      .exec()
      .then(result => ResStatus.ok(res, result))
      .catch(err => ResStatus.error(res, err));
  }

  static deleteById(req, res) {
    return LogsModel
      .findByIdAndRemove(req.params.id)
      .exec()
      .then(result => ResStatus.ok(res, result))
      .catch(err => ResStatus.error(res, err));
  }

  static delete(req, res) {
    return LogsModel
      .remove({})
      .exec()
      .then(result => ResStatus.ok(res, result))
      .catch(err => ResStatus.error(res, err));
  }

  static generate(req, res) {
    return LogsModel
      .generate({
        amount: 100
      })
      .then(result => ResStatus.created(res, result))
      .catch(err => ResStatus.error(res, err));
  }
}

module.exports = LogsController;
