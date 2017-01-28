const HttpStatus = require('http-status-codes');
const LogsModel = require('./logs.model').Model;

class LogsController {

  static post(req, res) {
    return LogsModel
      .create(req.body)
      .then(result => {
        res.status(HttpStatus.CREATED);
        res.json(result);
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.json(err);
      });
  }

  static get(req, res) {
    return LogsModel
      .find()
      .exec()
      .then(result => {
        res.status(HttpStatus.OK);
        res.json(result);
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.json(err);
      });
  }

  static getById(req, res) {
    return LogsModel
      .findById(req.params.id)
      .exec()
      .then(result => {
        res.status(HttpStatus.OK);
        res.json(result);
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.json(err);
      });
  }
}

module.exports = LogsController;
