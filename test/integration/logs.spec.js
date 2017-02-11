const superTest = require('supertest-as-promised');
const HttpStatus = require('http-status-codes');
const AppServer = require('./../../src/app-server');

const defaultConfig = require('./../test-lib/default-config');

describe('logs => integration tests', () => {
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

  afterEach(() => {
    return server
      .delete('/v1/logs');
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

  it('GET /logs => returns all logs', () => {
    return server
      .get('/v1/logs')
      .expect(HttpStatus.OK);
  });

  it('GET /logs/:id => returns null for an unknown id', () => {
    return server
      .get('/v1/logs/43345823304969c878318d12')
      .expect(HttpStatus.OK)
      .then(result => {
        expect(result).to.exist;
        expect(result.body).to.not.exist;
      });
  });

  it('GET /logs/:id => throws an error if an invalid id is passed', () => {
    return server
      .get('/v1/logs/abc')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR)
      .then(result => {
        expect(result).to.exist;
        expect(result.body).to.have.property('message').to.contain('Cast to ObjectId failed');
      });
  });

  it('DELETE /logs => will delete all existing logs', () => {
    return server
      .delete('/v1/logs')
      .expect(HttpStatus.OK);
  });

  it('DELETE /logs:id => will delete a single log entry', () => {

    const doc = {
      name: 'foo',
      source: 'test'
    };

    return server
      .post('/v1/logs')
      .send(doc)
      .expect(HttpStatus.CREATED)
      .then(resultInsert => {
        expect(resultInsert).to.exist;
        return server
          .delete(`/v1/logs/${resultInsert.body._id}`)
          .expect(HttpStatus.OK)
          .then(resultDelete => {
            expect(resultDelete).to.exist;
            expect(resultDelete).to.have.a.property('body').to.have.a.property('_id').to.be.equal(resultInsert.body._id);
          });
      });
  });
});
