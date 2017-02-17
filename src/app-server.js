const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const _ = require('lodash');
const logger = require('winster').instance();

const Context = require('./config/context');
const routesConfig = require('./config/routes-config');

const MqWorker = require('./mq/mq-worker');

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
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(bodyParser.json());

    routesConfig.init(this.app);
    this.mqWorker = new MqWorker();
  }

  start() {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(this.config.PORT, err => {
        if (err) {
          this.logger.error('Cannot start express server', err);
          return reject(err);
        }
        this.logger.info('Express server listening on port %d in "%s" mode', this.config.PORT, this.app.settings.env);
        return resolve();
      });
    });
  }

  stop() {
    return new Promise(resolve => {
      this.server.close(() => {
        // Todo: clean the connection to the DB properly
        // mongoose.disconnect();
        this.logger.info('Server stopped');
        resolve();
      });
    });
  }

}

module.exports = AppServer;
