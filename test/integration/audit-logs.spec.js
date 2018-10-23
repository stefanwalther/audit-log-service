const superTest = require('supertest');
const HttpStatus = require('http-status-codes');
const AppServer = require('./../../src/app-server');

const defaultConfig = require('./../test-lib/default-config');

describe('audit-logs => integration tests', () => {
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
      .delete('/v1/audit-logs');
  });

  it('POST /audit-logs => creates a new log entry', () => {
    const doc = {
      event_domain: 'event_domain',
      event: 'event_name',
      source: 'test',
      description: 'What so ever'
    };

    return server
      .post('/v1/audit-logs')
      .send(doc)
      .expect(HttpStatus.CREATED)
      .then(result => {
        expect(result).to.exist;
        expect(result.body).to.exist;
        expect(result.body).to.have.a.property('event_domain').to.be.equal(doc.event_domain);
        expect(result.body).to.have.a.property('event').to.be.equal(doc.event);
        expect(result.body).to.have.a.property('ts').to.exist;
      });
  });

  it('POST /audit-logs => throws an error with an unknown level', () => {
    const doc = {
      name: 'foo',
      event_name: 'TEST',
      description: 'What so ever',
      source: 'test',
      level: 'bla'
    };
    return server
      .post('/v1/audit-logs')
      .send(doc)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('POST /audit-logs => can log a message', () => {
    const doc = {
      event_domain: 'event_domain',
      event: 'event',
      description: 'What so ever',
      source: 'test',
      level: 'info',
      details: {
        foo: 'foo',
        bar: 'bar',
        baz: 'baz'
      }
    };

    return server
      .post('/v1/audit-logs')
      .send(doc)
      .expect(HttpStatus.CREATED)
      .then(result => {
        expect(result).to.exist;
        expect(result).to.have.a.property('body');
        expect(result.body).to.have.a.property('details').to.deep.equals(doc.details);
      });
  });

  it('GET /audit-logs => returns all audit-logs', () => {
    return server
      .get('/v1/audit-logs')
      .expect(HttpStatus.OK);
  });

  it('GET /audit-logs/:id => returns null for an unknown id', () => {
    return server
      .get('/v1/audit-logs/43345823304969c878318d12')
      .expect(HttpStatus.OK)
      .then(result => {
        expect(result).to.exist;
        expect(result.body).to.not.exist;
      });
  });

  it('GET /audit-logs/:id => throws an error if an invalid id is passed', () => {
    return server
      .get('/v1/audit-logs/abc')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR)
      .then(result => {
        expect(result).to.exist;
        expect(result.body).to.have.property('message').to.contain('Cast to ObjectId failed');
      });
  });

  it('DELETE /audit-logs => will delete all existing audit-logs', () => {
    return server
      .delete('/v1/audit-logs')
      .expect(HttpStatus.OK);
  });

  xit('DELETE /audit-logs:id => will delete a single log entry', () => {

    const doc = {
      name: 'foo',
      source: 'test'
    };

    return server
      .post('/v1/audit-logs')
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

  it('POST /audit-logs/generate => generates misc audit-logs', () => {
    const opts = {
      amount: 100
    };

    return server
      .post('/v1/audit-logs/generate')
      .send(opts)
      .expect(HttpStatus.CREATED)
      .then(result => {
        expect(result).to.exist;
        expect(result.body).to.exist;
        expect(result.body).to.have.a.property('insertedCount').to.be.equal(opts.amount);
      })
      .catch(err => {
        expect(err).to.not.exist;
      });
  });

  it('only the admin can delete all logs');
});
