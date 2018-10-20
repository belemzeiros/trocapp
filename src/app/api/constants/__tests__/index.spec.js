describe('constants', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it('NAMESPACE should be equal to TROCAPP', () => {
    // eslint-disable-next-line
    const { NAMESPACE } = require('../');
    expect(NAMESPACE).toEqual('TROCAPP');
  });
});
