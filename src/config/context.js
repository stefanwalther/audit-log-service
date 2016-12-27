const mongoose = require('mongoose');
const bluebird = require('bluebird');
const logger = require('./../helper/logger');

let instance;
class Context {
  constructor() {
    this.db = null;
    this.logger = logger;

    if (!this.db) {
      this.dbConnect();
    }
  }

  static instance() {
    if (!instance) {
      instance = new Context();
    }
    return instance;
  }

  // Todo: See: http://stackoverflow.com/questions/6676499/is-there-a-mongoose-connect-error-callback
  dbConnect() {
    const dbUri = process.env.SAMMLER_DB_URI_JOBS || 'mongodb://localhost:27017/logs';
    console.log('SAMMLER_LOG_SERVICE => DB URI', dbUri);
    const options = {};
    mongoose.Promise = bluebird;

    mongoose.connection.on('connected', () => {
      logger.debug('Mongoose default connection open to ' + dbUri);
    });

    // If the connection throws an error
    mongoose.connection.on('error', err => {
      logger.error('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', () => {
      logger.debug('Mongoose default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        logger.silly('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });

    this.db = mongoose.connect(dbUri, options);
  }

  dbDisconnect() {
    if (this.db) {
      // this.db.disconnect();
      mongoose.disconnect();
    }
  }
}

module.exports = Context;
