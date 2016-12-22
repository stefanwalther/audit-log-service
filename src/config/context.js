const mongoose = require('mongoose');
const bluebird = require('bluebird');

let instance;
class Context {
  constructor() {
    this.db = null;

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
    const uri = 'mongodb://localhost:27017/logs';
    const options = {};
    mongoose.Promise = bluebird;

    mongoose.connection.on('connected', () => {
      console.log('Mongoose default connection open to ' + uri);
    });

    // If the connection throws an error
    mongoose.connection.on('error', err => {
      console.log('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });

    this.db = mongoose.connect(uri, options);
  }

  dbDisconnect() {
    if (this.db) {
      // this.db.disconnect();
      mongoose.disconnect();
    }
  }
}

module.exports = Context;
