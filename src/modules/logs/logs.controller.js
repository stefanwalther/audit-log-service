const LogsModel = require('./logs.model').Model;
const ExpressResult = require('express-result');

class LogsController {

  static post(req, res) {
    return LogsModel
      .create(req.body)
      .then(result => ExpressResult.created(res, result))
      .catch(err => ExpressResult.error(res, err));
  }

  static get(req, res) {
    return LogsModel
      .find()
      .exec()
      .then(result => ExpressResult.ok(res, result))
      .catch(err => ExpressResult.error(res, err));
  }

  static getById(req, res) {
    return LogsModel
      .findById(req.params.id)
      .exec()
      .then(result => ExpressResult.ok(res, result))
      .catch(err => ExpressResult.error(res, err));
  }

  static deleteById(req, res) {
    return LogsModel
      .findByIdAndRemove(req.params.id)
      .exec()
      .then(result => ExpressResult.ok(res, result))
      .catch(err => ExpressResult.error(res, err));
  }

  static delete(req, res) {
    return LogsModel
      .remove({})
      .exec()
      .then(result => ExpressResult.ok(res, result))
      .catch(err => ExpressResult.error(res, err));
  }

  static generate(req, res) {
    return LogsModel
      .generate({
        amount: 100
      })
      .then(result => ExpressResult.created(res, result))
      .catch(err => ExpressResult.error(res, err));
  }
}

module.exports = LogsController;
