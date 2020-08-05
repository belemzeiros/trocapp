import { init } from 'elastic-apm-js-base';

export default async () => {
  const serverUrl = process.env.APM_SERVER_URL;
  if (!serverUrl) throw new Error('Empty serverUrl');
  init({
    serverUrl,
    serviceName: 'trocapp',
    serviceVersion: '1',
  });
};
