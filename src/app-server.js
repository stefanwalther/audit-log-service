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

    await mongoose.connect(mongoUri + '/Notification', {useNewUrlParser: true});

    try {
      this.server = await this.app.listen(this.config.PORT);
      this.logger.info(`Express server listening on port ${this.config.PORT} in "${this.config.NODE_ENV}" mode`);
    } catch (err) {
      this.logger.error('Cannot start express server', err);
    }
  }

  async stop() {
    try {
      await mongoose.connection.close();
      mongoose.models = {};
      mongoose.ModelSchemas = {};
      this.logger.verbose('Closed mongoose connection');
    } catch (e) {
      this.logger.verbose('Could not close mongoose connection', e);
    }
    try {
      await this.server.close();
      this.logger.info('Server stopped');
    } catch (e) {
      this.logger.error('Could not close server', e);
    }
  }

}

module.exports = AppServer;
