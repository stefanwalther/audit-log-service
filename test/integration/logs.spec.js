const superTest = require('supertest-as-promised');
const HttpStatus = require('http-status-codes');
const AppServer = require('./../../src/app-server');

const defaultConfig = require('./../test-lib/default-config');

describe('logs => integration', () => {
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

  it('POST /logs => creates a new log entry', () => {
    const doc = {
      name: 'foo'
    };

    return server
      .post('/v1/logs')
      .send(doc)
      .expect(HttpStatus.CREATED)
      .then(result => {
        expect(result).to.exist;
        expect(result.body).to.exist;
        expect(result.body).to.have.a.property('name').to.be.equal(doc.name);
        expect(result.body).to.have.a.property('ts').to.exist;
      });
  });
});
