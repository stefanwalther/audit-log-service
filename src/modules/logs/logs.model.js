const mongoose = require('mongoose');

const MongooseConfig = require('./../../config/mongoose-config');
const Schema = mongoose.Schema;

/* eslint-disable camelcase */
const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['fatal', 'error', 'debug', 'warn', 'data', 'info', 'verbose', 'trace'],
    default: 'info'
  },
  message: {
    type: Object
  },
  ts: {
    type: Date,
    default: new Date()
  }
}, {
  collection: MongooseConfig.COLLECTION_PREFIX + MongooseConfig.COLLECTION_LOGS,
  strict: true
});
/* eslint-enable camelcase */

schema.statics.generate = function (opts) {

  const docs = [];
  for (let i = 0; i < opts.amount; i++) {
    const doc = {
      name: `log-entry ${i}`,
      source: 'generated',
      level: 'info',
      message: {
        text: `Detailed message for ${i}`
      }
    };
    docs.push(doc);
  }
  return this.collection.insertMany(docs)
    .then(result => {
      return Promise.resolve(result);
    })
    .catch(err => {
      return Promise.reject(err);
    });
};
const model = mongoose.model(MongooseConfig.COLLECTION_JOBS, schema);

module.exports = {
  Schema: schema,
  Model: model
};
