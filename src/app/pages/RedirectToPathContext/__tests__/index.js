import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import RedirectToPathContext from '../';

describe('RedirectToPathContext', () => {
  const shallow = createShallow();

  it('RedirectToPathContext will mount correctly', () => {
    const wrapper = shallow(<RedirectToPathContext />);
    expect(wrapper).toMatchSnapshot();
  });
});
