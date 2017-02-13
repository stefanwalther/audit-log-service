const HttpStatus = require('http-status-codes');

class ResStatus {

  static ok(res, result) {
    res.status(HttpStatus.OK);
    res.json(result);
  }

  static created(res, result) {
    res.status(HttpStatus.CREATED);
    res.json(result);
  }

  static error(res, err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    res.json(err);
  }

}

module.exports = ResStatus;
