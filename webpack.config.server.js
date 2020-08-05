const { resolve } = require('path');
const webpack = require('webpack');

const nodeExternals = require('webpack-node-externals');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const Dotenv = require('dotenv-webpack');

/**
 * Configuração de Ambiente
 */
const publicUrl = process.env.PUBLIC_URL || '';
const development = process.env.NODE_ENV !== 'production';
const browser = false;

const WebpackLoaders = require('./webpack.loader')({ development, browser });
const WebpackResolve = require('./webpack.resolve');

const config = {
  name: 'server',
  target: 'node',
  mode: development ? 'development' : 'production',
  node: {
    __filename: false,
    __dirname: false,
  },
  externals: [
    nodeExternals({
      whitelist: [/^bootstrap/, /^react-universal-component/],
    }),
  ],
  resolve: WebpackResolve,
  entry: './src/server/render.js',
  output: {
    filename: 'render.js',
    libraryTarget: 'commonjs2',
    path: development
      ? resolve(__dirname, 'tmp', 'dev-server')
      : resolve(__dirname, 'build'),
    publicPath: process.env.PATH_CONTEXT
      ? `${publicUrl}${process.env.PATH_CONTEXT}/`
      : `${publicUrl}/`,
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: WebpackLoaders.js,
      },
      {
        test: /\.css$/,
        use: WebpackLoaders.css,
      },
      {
        test: /\.(scss|sass)$/,
        use: WebpackLoaders.sass,
      },
      {
        test: /\.(bmp|gif|jpg|jpeg|png)$/,
        use: WebpackLoaders.images,
      },
      {
        test: /\.(svg)$/,
        use: WebpackLoaders.svg,
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/,
        use: WebpackLoaders.fonts,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(development ? 'development' : 'production'),
        BROWSER: JSON.stringify(browser),
      },
    }),
    new Dotenv({
      systemvars: true,
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    development &&
      new ProgressBarPlugin({
        format: 'Build [:bar] :percent (:elapsed seconds)',
        clear: false,
      }),
  ].filter(x => x),
};

module.exports = config;
