import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import ErrorPage from '../';

describe('ErrorPage', () => {
  const shallow = createShallow();

  it('ErrorPage will mount correctly', () => {
    const wrapper = shallow(<ErrorPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
