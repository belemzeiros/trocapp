import error from '../error';

import index from '../';

describe('reducers', () => {
  it('should exports all reducers', () => {
    expect(index).toHaveProperty('error');
  });

  it('should has same properties', () => {
    expect(index).toStrictEqual({
      error,
    });
  });
});
