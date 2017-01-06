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

  static get(req) {
    return LogsModel
      .findById(req.param.id)
      .exec();
  }
}

module.exports = LogsController;
