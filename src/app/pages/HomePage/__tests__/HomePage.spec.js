import React from 'react';
import TestRenderer from 'react-test-renderer';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import MockDate from 'mockdate';
import { fromJS } from 'immutable';

import HomePage from '../HomePage';

describe('HomePage', () => {
  const mockStore = configureStore();

  let store;

  beforeEach(() => {
    store = mockStore(fromJS({}));
  });

  beforeAll(() => {
    MockDate.set('2020-07-01T00:00:00.000Z');
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('HomePage with props will mount correctly', () => {
    const wrapper = TestRenderer.create(
      <Provider store={store}>
        <HomePage />
      </Provider>
    ).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
