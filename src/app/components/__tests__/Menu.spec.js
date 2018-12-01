import React from 'react';
import { shallow, mount } from 'enzyme';
import Menu from '../Menu';

describe('menu', () => {
  it('deveria exibir o titulo da pagina', () => {
    const wrapper = shallow(<Menu title="Home" />);
    expect(wrapper.props().title).toEqual('Home');
  });
  it('deveria ser igual ao snapshot', () => {
    const wrapper = mount(<Menu title="home" />);
    expect(wrapper).toMatchSnapshot();
  });
});
