import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import WebsiteLayout from '../WebsiteLayout';

describe('WebsiteLayout', () => {
  const shallow = createShallow();

  it('WebsiteLayout will mount correctly', () => {
    const route = {
      page: jest.fn(),
    };
    const wrapper = shallow(<WebsiteLayout route={route} />);
    expect(wrapper).toMatchSnapshot();
  });
});
