const amqp = require('amqplib');
const LogsModel = require('./../modules/logs/logs.model').Model;
const logger = require('winster').instance();

class MqWorker {
  constructor() {
    this.init();
  }

  init() {
    this.listenWinston();
  }

  listenWinston() {

    const uri = process.env.SAMMLER_RABBITMQ_URI;
    const ex = 'winston';
    const queueName = 'queue.winston';

    amqp.connect(uri)
      .then(conn => {
        return conn.createChannel();
      })
      .then(ch => {
        Promise.all([
          ch.assertExchange(ex, 'direct', {durable: true}),
          ch.assertQueue(queueName, {exclusive: false}),
          ch.bindQueue(queueName, ex, 'winston')
        ]).then(() => {
          ch.consume(queueName, this.handleMessage, {noAck: true});
        });
      })
      .catch(err => {
        logger.error('Error connecting to queue.winston', err);
      });
  }

  handleMessage(msg) {

    // Todo: replace with logger
    logger.trace(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString()); // eslint-disable-line quotes

    const msgToLog = JSON.parse(msg.content.toString());
    msgToLog.source = 'foo';
    LogsModel
      .create(msgToLog)
      .catch(err => {
        logger.error(err);
      });

  }
}

module.exports = MqWorker;
