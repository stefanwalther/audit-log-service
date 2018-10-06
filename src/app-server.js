const initializer = require('express-initializers');
const _ = require('lodash');
const express = require('express');
const logger = require('winster').instance();
const path = require('path');
const MongooseConnectionConfig = require('mongoose-connection-config');
const mongoose = require('mongoose');

const mongoUri = new MongooseConnectionConfig(require('./config/mongoose-config')).getMongoUri();
const defaultConfig = require('./config/config');

class AppServer {
  constructor(config) {
    this.config = _.extend(_.clone(defaultConfig), config || {});

    this.server = null;
    this.logger = logger;
    this._initApp();
  }

  _initApp() {
    this.app = express();
  }

  async start() {

    await initializer(this.app, {directory: path.join(__dirname, 'config/initializers')});
    this.logger.trace(`mongoUri: ${mongoUri}`);

    // Todo: OK; we have to change this ...
    await mongoose.connect(mongoUri + '/Notification', {useNewUrlParser: true});

    try {
      this.server = await this.app.listen(this.config.PORT);
      this.logger.info(`Express server listening on port ${this.config.PORT} in "${this.config.NODE_ENV}" mode`);
    } catch (err) {
      this.logger.error('Cannot start express server', err);
    }
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
