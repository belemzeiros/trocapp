describe('Logger', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it('When log error has been called', () => {
    // eslint-disable-next-line
    const logger = require('../logger');
    logger.error = jest.fn();
    logger.stream.write('Some log message', 'error');
    expect(logger.error).toBeCalled();
  });

  it('When log warn has been called', () => {
    // eslint-disable-next-line
    const logger = require('../logger');
    logger.warn = jest.fn();
    logger.stream.write('Some log message', 'warn');
    expect(logger.warn).toBeCalled();
  });

  it('When log info has been called', () => {
    // eslint-disable-next-line
    const logger = require('../logger');
    logger.info = jest.fn();
    logger.stream.write('Some log message');
    expect(logger.info).toBeCalled();
  });

  it('When NODE_ENV is equal to production then change log level to warn', () => {
    process.env.NODE_ENV = 'production';
    // eslint-disable-next-line
    const logger = require('../logger');
    logger.info = jest.fn();
    logger.stream.write('Some log message');
    expect(logger.info).toBeCalled();
    expect(logger.level).toEqual('warn');
  });
});
