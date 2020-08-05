import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import App from '../App';

describe('App', () => {
  const shallow = createShallow();

  it('App will mount correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should remove jss-server-side from DOM', () => {
    const jssStyleNode = document.createElement('style');
    jssStyleNode.id = 'jss-server-side';
    document.body.appendChild(jssStyleNode);
    expect(document.getElementById('jss-server-side').tagName).toEqual('STYLE');
    shallow(<App />);
    expect(document.getElementById('jss-server-side')).toBeFalsy();
  });
});
