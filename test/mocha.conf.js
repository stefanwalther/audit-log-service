process.env.NODE_ENV = 'test';

// Todo: The is really not needed (anymore), is it?
if (process.env.CIRCLECI !== 'true') {
  process.env.SAMMLER_DB_URI_LOGS = 'mongodb://localhost:27018/audit-logs';
}

global.expect = require('chai').expect;

