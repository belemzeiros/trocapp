import React from 'react';
import { shallow } from 'enzyme';
import ProductDetailPage from '../';

it('Deveria exibir uma frase de detalhe de produtos', () => {
  const wrapper = shallow(<ProductDetailPage />);
  expect(wrapper.text()).toEqual('Detalhes do Produto');
});
