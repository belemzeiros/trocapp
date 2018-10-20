/* eslint-disable */
require('babel-polyfill');
const express = require('express');
const compression = require('compression');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const promBundle = require('express-prom-bundle');

const Loadable = require('react-loadable');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const clientConfig = require('./webpack.config.client.js');
const serverConfig = require('./webpack.config.server.js');

const development = process.env.NODE_ENV !== 'production';

const cache = require('./src/server/cache');

const logger = require('./src/server/config/logger');

const app = express();
app.disable('x-powered-by');
app.use(compression());
app.use(morgan('combined', { stream: logger.stream }));
app.set('logger', logger);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Monitoramento
app.use(
  promBundle({
    includeMethod: true,
    includePath: true,
    customLabels: { project_name: 'trocapp' },
  })
);

// Health Check
app.get('/health', (req, res) => {
  res.sendStatus(200);
});

// Static Files
app.use(
  serveStatic(
    development
      ? path.resolve(__dirname, 'public')
      : path.resolve(__dirname, 'build', 'public'),
    {
      index: false,
    }
  )
);

// Define PORT
app.set('port', process.env.PORT || 3000);

// Controle para HMR
let isBuilt = false;

// Inicia Server
const start = () => {
  isBuilt = true;

  // Middleware de Erro
  app.use((err, req, res, next) => {
    logger.stream.write(err.stack, 'error');
    res.status(500).send('Something broke!');
  });

  Loadable.preloadAll().then(() => {
    app.listen(app.get('port'), () =>
      logger.stream.write(`Server on http://localhost:${app.get('port')}`)
    );
  });
};

// Quando build HMR terminar
const done = () => !isBuilt && start();

if (development) {
  const compiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = compiler.compilers[0];
  const options = {
    publicPath: clientConfig.output.publicPath,
    stats: { colors: true },
  };

  app.use(webpackDevMiddleware(compiler, options));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(compiler));

  compiler.plugin('done', done);
} else {
  /* eslint-disable import/no-unresolved */
  const serverRender = require('./build/render.js').default;
  /* eslint-disable import/no-unresolved */

  app.use(serverRender());
  start();
}
