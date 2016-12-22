
module.exports = {
  COLLECTION_PREFIX: 'global~~',
  FIELD_CREATED_AT: process.env.MONGOOSE_DEFAULTS_CREATED_AT || 's5r_created_at',
  FIELD_UPDATED_AT: process.env.MONGOOSE_DEFAULTS_UPDATED_AT || 's5r_updated_at',

  COLLECTION_JOBS: 'jobs'
};
