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
      name: 'foo',
      source: 'test'
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

  it('POST /logs => throws an error with an unknown level', () => {
    const doc = {
      name: 'foo',
      source: 'test',
      level: 'bla'
    };
    return server
      .post('/v1/logs')
      .send(doc)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('POST /logs => can log a message', () => {
    const doc = {
      name: 'foo',
      source: 'test',
      level: 'info',
      message: {
        foo: 'foo',
        bar: 'bar',
        baz: 'baz'
      }
    };

    return server
      .post('/v1/logs')
      .send(doc)
      .expect(HttpStatus.CREATED)
      .then(result => {
        expect(result).to.exist;
        expect(result).to.have.a.property('body');
        expect(result.body).to.have.a.property('message');
        expect(result.body.message).to.deep.equal(doc.message);
      });
  });
});
