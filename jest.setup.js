import Enzyme from 'enzyme';
import 'jest-enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import fetch from 'jest-fetch-mock';
import * as matchers from 'jest-immutable-matchers';

Enzyme.configure({ adapter: new EnzymeAdapter() });
jest.addMatchers(matchers);

const { window } = new JSDOM(
  '<!doctype html><html><head></head><body><div id="root"></div></body></html>'
);

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce(
      (result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop),
      }),
      {}
    );
  Object.defineProperties(target, props);
}

window.matchMedia = window.matchMedia || (() => ({ matches: false }));

global.window = window;
global.document = window.document;
global.fetch = fetch;
global.navigator = {
  userAgent:
    'Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/_BuildID_) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36',
};
copyProps(window, global);
