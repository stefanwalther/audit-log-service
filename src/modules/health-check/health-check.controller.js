const pkg = require('./../../../package.json');

class HealthController {

  // Everbody can call the router, so we are fine.
  static all(req, res, next) {
    next();
  }

  static get(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
      ts: new Date().toJSON(),
      version: pkg.version,
      name: pkg.name,
      repository: pkg.repository
    });
    next();
  }

}

module.exports = HealthController;
