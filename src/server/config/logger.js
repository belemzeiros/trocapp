const { createLogger, format, transports } = require('winston');

const { combine, timestamp, json } = format;
const development = process.env.NODE_ENV !== 'production';

const logger = createLogger({
  level: development ? 'verbose' : 'warn',
  format: combine(timestamp(), json()),
  transports: [new transports.Console()],
  exitOnError: false,
});

logger.stream = {
  write(message, level) {
    switch (level) {
      case 'error':
        logger.error(message);
        break;
      case 'warn':
        logger.warn(message);
        break;
      default:
        logger.info(message);
    }
  },
};

module.exports = logger;
