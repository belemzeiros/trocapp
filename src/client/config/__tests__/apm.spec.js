import apmMock from 'elastic-apm-js-base';
import apm from '../apm';

describe('elastic apm', () => {
  beforeEach(() => {
    delete process.env.APM_SERVER_URL;
  });

  it('should call initApm', () => {
    process.env = { APM_SERVER_URL: 'http://localhost' };
    apm();
    expect(apmMock.init).toBeCalledWith({
      serverUrl: 'http://localhost',
      serviceName: 'trocapp',
      serviceVersion: '1',
    });
  });

  it('should throw an error', () => {
    expect.assertions(1);
    apm().catch(e => expect(e).toBeTruthy());
  });
});
