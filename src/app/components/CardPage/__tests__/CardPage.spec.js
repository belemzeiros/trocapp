import React from 'react';
import { shallow, mount } from 'enzyme';
import CardPage from '../';

describe('<CardPage />', () => {
  it('deveria receber os props corretamente', () => {
    const wrapper = shallow(
      <CardPage image="teste.png" title="teste" description="mock" />
    );
    expect(wrapper.props().image).toEqual('teste.png');
    expect(wrapper.props().title).toEqual('teste');
    expect(wrapper.props().description).toEqual('mock');
  });
  it('deveria ser igual ao snapshot', () => {
    const wrapper = mount(
      <CardPage image="teste.png" title="teste" description="mock" />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
