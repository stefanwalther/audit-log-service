const bodyParser = require('body-parser');
const express = require('express');
const _ = require('lodash');

const Context = require('./config/context');
const logger = require('./helper/logger');
const routeConfig = require('./route-config');

class AppServer {
  constructor(config) {
    this.config = config || {};

    this.server = null;
    this.logger = logger;
    this.context = Context.instance();
    this._initApp();
  }

  _initApp() {
    this.app = express();
    this.app.use(bodyParser.json());
    routeConfig.init(this.app);
  }

  start() {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(this.config.PORT, err => {
        if (err) {
          this.logger.error('Cannot start express server', err);
          return reject(err);
        }
        this.logger.debug('Express server listening on port %d in "%s" mode', this.config.PORT, this.app.settings.env);
        return resolve();
      });
    });
  }

  stop() {
    return new Promise(resolve => {
      this.server.close(() => {
        // Todo: clean the connection to the DB properly
        // mongoose.disconnect();
        this.logger.debug('Server stopped');
        resolve();
      });
    });
  }

}

module.exports = AppServer;
