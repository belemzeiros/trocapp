import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';

import cache from '../cache';

let request;
let response;

const mockCache = { data: 'cached data' };

describe('cache', () => {
  beforeEach(() => {
    response = new Response();
    request = new Request();
    request.url = '/cache/data';
  });

  afterEach(() => {
    request.resetMocked();
    response.resetMocked();
  });

  it('should middleware not create cache on first request on error=true', () => {
    const key = request.url;
    const next = jest.fn();

    cache.middleware()(request, response, next);

    expect(cache.has(key)).toBeFalsy();
    expect(next).toBeCalled();

    response.cache(mockCache, true);

    expect(cache.has(key)).toBeFalsy();

    expect(response.json).toHaveBeenCalledTimes(1);
  });

  it('should middleware create cache on first request', () => {
    const key = request.url;
    const next = jest.fn();

    cache.middleware()(request, response, next);

    expect(cache.has(key)).toBeFalsy();
    expect(next).toBeCalled();

    response.cache(mockCache);

    expect(cache.has(key)).toBeTruthy();
    expect(cache.get(key)).toEqual(mockCache);

    expect(response.json).toHaveBeenCalledTimes(1);
  });

  it('should middleware update cache', () => {
    const key = request.url;
    const next = jest.fn();

    // Cache inicial
    cache.put(key, mockCache);

    cache.middleware()(request, response, next);

    expect(cache.has(key)).toBeTruthy();
    expect(cache.get(key)).toEqual(mockCache);
    expect(next).toBeCalled();

    const newCache = { data: 'new cache' };
    response.cache(newCache);

    expect(cache.has(key)).toBeTruthy();
    expect(cache.get(key)).toEqual(newCache);

    expect(response.json).toHaveBeenCalledTimes(1);
  });

  it('should middleware not update cache on error=true', () => {
    const key = request.url;
    const next = jest.fn();

    // Cache inicial
    cache.put(key, mockCache);

    cache.middleware()(request, response, next);

    expect(cache.has(key)).toBeTruthy();
    expect(cache.get(key)).toEqual(mockCache);
    expect(next).toBeCalled();

    const newCache = { data: 'new cache' };
    response.cache(newCache, true);

    expect(cache.has(key)).toBeTruthy();
    // Cache não pode ter alterado
    expect(cache.get(key)).toEqual(mockCache);

    expect(response.json).toHaveBeenCalledTimes(1);
  });
});
