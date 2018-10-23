import 'babel-polyfill';
import 'isomorphic-fetch';
import 'jquery';

import React from 'react';
import { hydrate } from 'react-dom';
import { preloadReady } from 'react-loadable';
import { BrowserRouter } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import createSaga from 'redux-saga';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import reducers from '@/api/reducers';
import rootSaga from '@/api/sagas';

import App from '@/App';

import apm from './config/apm';

apm().catch(() => {
  // create a windows transport for browser support
});

const saga = createSaga();
const store = createStore(
  combineReducers(reducers),
  fromJS(window.INITIAL_STATE),
  composeWithDevTools(applyMiddleware(saga))
);

saga.run(rootSaga);

preloadReady().then(() =>
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  )
);

if (process.env.NODE_ENV === 'production') {
  const OfflinePlugin = require('offline-plugin/runtime');
  OfflinePlugin.install({
    onUpdateReady: () => {
      OfflinePlugin.applyUpdate();
    },
    onUpdated: () => {
      window.location.reload();
    },
  });
}
