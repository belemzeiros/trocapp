import StorageService from '../StorageService';

const StorageFallback = Storage;

describe('Services', () => {
  describe('StorageService', () => {
    describe('Constructor', () => {
      it('When Storage API is found would create a instance successfully using storageType param', () => {
        const instance = new StorageService('local');
        expect(instance).toBeInstanceOf(StorageService);
        expect(instance.storageType).toEqual('local');
      });
      it('When Storage API is found would create a instance successfully using fallback storageType', () => {
        const instance = new StorageService();
        expect(instance).toBeInstanceOf(StorageService);
        expect(instance.storageType).toEqual('session');
      });
      it('When Storage API is not found would create a instance using cookie storageType', () => {
        delete window.Storage;
        const instance = new StorageService('local');
        expect(instance).toBeInstanceOf(StorageService);
        expect(instance.storageType).toEqual('cookie');
        window.Storage = StorageFallback;
      });
    });
    describe('GetCookie', () => {
      it('Should return empty string on not have cookies', () => {
        const response = new StorageService('cookie').getCookie('notFoundKey');
        expect(response).toEqual('');
      });
      it('Should return empty string on not found key', () => {
        const service = new StorageService('cookie');
        service.setCookie('otherKey', 'some value inside cookie', 1);
        const response = service.getCookie('notFoundKey');
        expect(response).toEqual('');
      });
      it('Should return the correct value on found key at end key', () => {
        document.cookie = 'badKey=some value inside cookie';
        const service = new StorageService('cookie');
        const response = service.getCookie('badKey');
        expect(response).toEqual('some value inside cookie');
      });
      it('Should return the correct value on found key', () => {
        const service = new StorageService('cookie');
        service.setCookie('foundKey', 'Found value inside cookie', 1, '/');
        const response = service.getCookie('foundKey');
        expect(response).toEqual('Found value inside cookie');
      });
    });
    describe('SetCookie', () => {
      it('Should has been create a cookie without expires and path', () => {
        const service = new StorageService('cookie');
        service.setCookie('badKey', 'Not complete cookie');
        const response = service.getCookie('badKey');
        expect(response).toEqual('Not complete cookie');
      });
      it('Should has been create a cookie with expires and path', () => {
        const service = new StorageService('cookie');
        service.setCookie('niceKey', 'Complete cookie', 1, '/');
        const response = service.getCookie('niceKey');
        expect(response).toEqual('Complete cookie');
      });
    });
    describe('SetItem', () => {
      it('When value param is undefined not create searchUrl key on localStorage', () => {
        const service = new StorageService('local');
        const beforeValues = service.getItem('searchUrl');
        service.setItem('searchUrl');
        const afterValues = service.getItem('searchUrl');
        expect(beforeValues).toStrictEqual(afterValues);
      });
      it('Should create searchUrl key on localStorage successfully', () => {
        const service = new StorageService('local');
        service.setItem('searchUrl', {
          air: {
            ages: '30',
          },
        });
        const afterValues = service.getItem('searchUrl');
        expect(afterValues).toStrictEqual({
          air: {
            ages: '30',
          },
        });
      });
      it('Should create searchUrl key on document.cookie successfully', () => {
        const service = new StorageService('cookie');
        service.setItem('searchUrl', {
          air: {
            ages: '30',
          },
        });
        const afterValues = service.getItem('searchUrl');
        expect(afterValues).toStrictEqual({
          air: {
            ages: '30',
          },
        });
      });
    });
    describe('GetItem', () => {
      it('Should return item from cookie', () => {
        const service = new StorageService('cookie');
        service.setCookie('searchUrl', '{"package": "Some Value"}');
        expect(service.getItem('searchUrl')).toStrictEqual({
          package: 'Some Value',
        });
      });
      it('Should return item from Storage API', () => {
        const service = new StorageService('local');
        service.setItem('searchUrl', {
          package: 'Some Value',
        });
        expect(service.getItem('searchUrl')).toStrictEqual({
          package: 'Some Value',
        });
      });
      it('Should return a empty object from Storage API on not found key', () => {
        const service = new StorageService('session');
        expect(service.getItem('notFound')).toStrictEqual({});
      });
    });
    describe('GetChild', () => {
      it('When not exists a key on searchUrl then return empty object', () => {
        const service = new StorageService('cookie');
        service.setItem('searchUrl', {
          package: 'Some Value',
        });
        expect(service.getChild('searchUrl', 'air')).toStrictEqual({});
      });
      it('When return empty object on not exists a key from cookie', () => {
        const service = new StorageService('cookie');
        expect(service.getChild('notFountRootKey', 'air')).toStrictEqual({});
      });
      it('Should return saved value by custom key inside parent object from localStorage', () => {
        const service = new StorageService('local');
        service.setItem('searchUrl', {
          package: 'Some Value',
        });
        const response = service.getChild('searchUrl', 'package');
        expect(response).toEqual('Some Value');
      });
      it('Should return empty object on not found parent key from localStorage', () => {
        const service = new StorageService('local');
        service.setItem('searchUrl', {
          package: 'Some Value',
        });
        const response = service.getChild('air');
        expect(response).toStrictEqual({});
      });
    });
    describe('SetChild', () => {
      it('Should not save on invalid params', () => {
        const service = new StorageService('cookie');
        const beforeValue = service.getChild('notFountRootKey', 'air');
        service.setChild('notFountRootKey', 'childKey');
        const afterValue = service.getChild('notFountRootKey', 'air');
        expect(afterValue).toStrictEqual(beforeValue);
      });
      it('When storageType is equal to cookie then append a child key to parent', () => {
        const service = new StorageService('cookie');
        service.setCookie(
          'hotel',
          '{"checkIn":"27-09-2018","checkOut":"28-09-2018"}'
        );
        const before = service.getChild('hotel', 'adults');
        expect(before).toStrictEqual({});
        service.setChild('hotel', 'adults', '2');
        expect(service.getChild('hotel', 'adults')).toEqual('2');
      });
      it('When storageType is equal to cookie and parent key is null then create parent and append a child key', () => {
        const service = new StorageService('cookie');
        const beforeParent = service.getCookie('airHotel');
        expect(beforeParent).toEqual('');
        service.setChild('airHotel', 'products', ['flight', 'hotel']);
        const response = service.getChild('airHotel', 'products');
        expect(response).toStrictEqual(['flight', 'hotel']);
      });
      it('When storageType is not cookie and parent key is null then create parent and append a child key', () => {
        const service = new StorageService('local');
        const beforeParent = service.getItem('airHotel');
        expect(beforeParent).toStrictEqual({});
        service.setChild('airHotel', 'products', ['flight', 'hotel']);
        const response = service.getChild('airHotel', 'products');
        expect(response).toStrictEqual(['flight', 'hotel']);
      });
      it('When storageType is not cookie and parent key exists then append a child key', () => {
        const service = new StorageService('session');
        service.setItem('airHotel', {
          products: ['flight', 'hotel'],
        });
        const beforeParent = service.getItem('airHotel');
        expect(beforeParent).toStrictEqual({
          products: ['flight', 'hotel'],
        });
        service.setChild('airHotel', 'ages', '30,30');
        const response = service.getItem('airHotel');
        expect(response).toStrictEqual({
          products: ['flight', 'hotel'],
          ages: '30,30',
        });
      });
    });
    describe('SetSomeKeys', () => {
      it('When storageType is cookie and is not keys to map', () => {
        const hotel = {
          adults: '2',
          checkIn: '2018-11-12T02:00:00.000Z',
          checkOut: '2018-11-13T02:00:00.000Z',
          childAges: '',
          children: '',
        };
        const service = new StorageService('cookie');
        service.setSomeKeys('searchEngine', 'hotel', hotel);

        expect(service.getItem('searchEngine').hotel).toStrictEqual(hotel);
      });
      it('When storageType is cookie and there is keys to map', () => {
        const hotel = {
          adults: '2',
          checkIn: '2018-11-12T02:00:00.000Z',
          checkOut: '2018-11-13T02:00:00.000Z',
          childAges: '',
          children: '',
        };
        const service = new StorageService('cookie');
        service.setSomeKeys('searchEngine', 'hotel', hotel, [
          'adults',
          'checkIn',
          'checkOut',
        ]);

        expect(service.getItem('searchEngine').hotel).toStrictEqual({
          adults: '2',
          checkIn: '2018-11-12T02:00:00.000Z',
          checkOut: '2018-11-13T02:00:00.000Z',
        });
      });
      it('When storageType is not cookie and there is keys to map', () => {
        const hotel = {
          adults: '2',
          checkIn: '2018-11-12T02:00:00.000Z',
          checkOut: '2018-11-13T02:00:00.000Z',
          childAges: '',
          children: '',
        };
        const service = new StorageService('local');
        service.setSomeKeys('searchEngine', 'hotel', hotel, [
          'adults',
          'checkIn',
          'checkOut',
        ]);

        expect(service.getItem('searchEngine').hotel).toStrictEqual({
          adults: '2',
          checkIn: '2018-11-12T02:00:00.000Z',
          checkOut: '2018-11-13T02:00:00.000Z',
        });
      });
      it('When storageType is not cookie and there is a array at keys to map', () => {
        const hotel = {
          adults: '2',
          checkIn: '2018-11-12T02:00:00.000Z',
          checkOut: '2018-11-13T02:00:00.000Z',
          childAges: '',
          children: '',
          locationObj: {
            IATA: 'NYC',
            description: 'Nova York - NY , Estados Unidos da América',
          },
        };
        const service = new StorageService('local');
        service.setSomeKeys('searchEngine', 'hotel', hotel, [
          'adults',
          'checkIn',
          'checkOut',
          ['locationObj', 'location'],
        ]);

        expect(service.getItem('searchEngine').hotel).toStrictEqual({
          adults: '2',
          checkIn: '2018-11-12T02:00:00.000Z',
          checkOut: '2018-11-13T02:00:00.000Z',
          location: {
            IATA: 'NYC',
            description: 'Nova York - NY , Estados Unidos da América',
          },
        });
      });
    });
    describe('GetSomeKeys', () => {
      it('Gets data from storage and update an exists object', () => {
        const hotel = {
          adults: '2',
          checkIn: '2018-11-12T02:00:00.000Z',
          checkOut: '2018-11-13T02:00:00.000Z',
        };
        const savedHotel = {
          adults: '2',
          checkIn: '2018-11-12T02:00:00.000Z',
          checkOut: '2018-11-13T02:00:00.000Z',
          location: {
            IATA: 'NYC',
            description: 'Nova York - NY , Estados Unidos da América',
          },
        };

        const service = new StorageService('session');
        service.setChild('searchEngine', 'hotel', savedHotel);
        const result = service.getSomeKeys('searchEngine', 'hotel', hotel);

        expect(result).toStrictEqual({
          ...hotel,
          location: { ...savedHotel.location },
        });
      });
      it('Gets data from storage and returns created object', () => {
        const hotel = {
          adults: '2',
          checkIn: '2018-11-12T02:00:00.000Z',
          checkOut: '2018-11-13T02:00:00.000Z',
        };
        const savedHotel = {
          adults: '2',
          checkIn: '2018-11-12T02:00:00.000Z',
          checkOut: '2018-11-13T02:00:00.000Z',
          location: {
            IATA: 'NYC',
            description: 'Nova York - NY , Estados Unidos da América',
          },
        };

        const service = new StorageService('session');
        service.setChild('searchEngine', 'hotel', savedHotel);
        const result = service.getSomeKeys('searchEngine', 'hotel');

        expect(result).toStrictEqual({
          ...hotel,
          location: { ...savedHotel.location },
        });
      });
      it('When parent key is not found then returns created object', () => {
        const service = new StorageService('session');
        const result = service.getSomeKeys('searchUrl', 'air');

        expect(result).toStrictEqual({});
      });
    });
  });
});
