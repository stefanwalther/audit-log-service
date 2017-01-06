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
  ts: {
    type: Date,
    default: new Date()
  }
}, {
  collection: MongooseConfig.COLLECTION_PREFIX + MongooseConfig.COLLECTION_JOBS,
  strict: true
});
/* eslint-enable camelcase */

module.exports.Schema = schema;
module.exports.Model = mongoose.model(MongooseConfig.COLLECTION_JOBS, schema);
