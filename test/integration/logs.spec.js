const superTest = require('supertest-as-promised');
const HttpStatus = require('http-status-codes');
const AppServer = require('./../../src/app-server');

const defaultConfig = require('./../test-lib/default-config');

describe('jobs => integration', () => {
  let server;
  const appServer = new AppServer(defaultConfig);
  before(() => {
    return appServer.start()
      .then(() => {
        server = superTest(appServer.server);
      });
  });

  after(() => {
    return appServer.stop();
  });

  it('', () => {
    expect(true).to.be.true;
  });
});
