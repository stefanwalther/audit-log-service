const HttpStatus = require('http-status-codes');

class ResStatus {

  static ok(res, result) {
    res.status(HttpStatus.OK).json(result);
  }

  static created(res, result) {
    res.status(HttpStatus.CREATED).json(result);
  }

  static error(res, err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
  }

}

module.exports = ResStatus;
