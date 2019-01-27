const Stan = require('node-nats-streaming');
const logger = require('winster').instance();
const AuditLogsModel = require('./audit-logs.model').Model;
const config = require('../../config/server-config');

let stan = null;

class AuditLogsSubscriber {
  constructor() {
    this.clusterId = 'test-cluster';
    this.clientId = 'audit-log-service_' + process.pid;
    this.server = config.NATS_STREAMING_SERVER;
  }

  subscribe(clusterId, clientId, natsOpts) {

    const NATS_SUBJECT = 'audit-logs';
    const NATS_QUEUE = 'audit-logs.workers';

    const opts = Object.assign(natsOpts || {}, {
      json: true,
      reconnect: true,
      reconnectTimeWait: 2000,
      verbose: true,
      waitOnFirstconnect: true
    });

    let stanInstance = Stan.connect(clusterId || this.clusterId, clientId || this.clientId, this.server, opts, () => {
      logger.verbose('We are connected to stan');
    });

    stanInstance.on('connect', function () {
      logger.verbose('We are connected to stan (on:connect)');
      stan = stanInstance;

      let subscriptionOptions = stan.subscriptionOptions()
        .setStartWithLastReceived();
      let subscription = stan.subscribe(NATS_SUBJECT, NATS_QUEUE, subscriptionOptions);

      subscription.on('message', function (msg) {
        console.log(`audit-logs:on:message [ ${msg.getSequence()} ]`, msg.getData());
        AuditLogsModel.create(JSON.parse(msg.getData()))
          .then(result => {
            console.log('result', result);
          })
          .catch(err => {
            console.error('err', err);
          });
      });

    });

    stanInstance.on('close', function () {
      logger.trace('Connection to stan is closed.');
    });

    stanInstance.on('error', function (err) {
      logger.error(`Error connecting to Stan: "${err}"`);
    });

    stanInstance.on('disconnect', function () {
      logger.trace('Disconnect to stan ...');
    });

    stanInstance.on('reconnect', function () {
      logger.trace('Reconnect to stan ...');
    });

    stanInstance.on('reconnecting', function () {
      logger.trace('Reconnecting to stan ...');
    });
  }
}

module.exports = AuditLogsSubscriber;
