const Winston = require('winston');

const logger = new Winston.Logger({
  transports: [
    new Winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

logger.log = function () {
  const args = arguments;
  // args[1] = args[1] + '\r\n';
  Winston.Logger.prototype.log.apply(this, args);
};

module.exports = logger;
