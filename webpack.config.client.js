const { resolve } = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const RemoveServiceWorkerPlugin = require('webpack-remove-serviceworker-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const Dotenv = require('dotenv-webpack');

/**
 * Configuração de Ambiente
 */
const publicUrl = process.env.PUBLIC_URL || '';
const development = process.env.NODE_ENV !== 'production';
const browser = true;

const WebpackLoaders = require('./webpack.loader')({ development, browser });
const WebpackResolve = require('./webpack.resolve');

const config = {
  name: 'client',
  target: 'web',
  mode: development ? 'development' : 'production',
  resolve: WebpackResolve,
  entry: {
    main: [
      development && 'webpack-hot-middleware/client',
      './src/client/index.js',
    ].filter(x => x),
  },
  output: {
    filename: development ? '[name].js' : 'static/js/[name].[chunkhash:8].js',
    chunkFilename: development
      ? '[name].chunk.js'
      : 'static/js/[name].[chunkhash:8].chunk.js',
    path: development
      ? resolve(__dirname, 'tmp', 'dev-server')
      : resolve(__dirname, 'build', 'public', 'trocapp'),
    publicPath: process.env.PATH_CONTEXT
      ? `${publicUrl}${process.env.PATH_CONTEXT}/`
      : `${publicUrl}/`,
  },
  performance: {
    hints: false,
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: 'expose-loader',
            options: '$',
          },
          {
            loader: 'expose-loader',
            options: 'jQuery',
          },
        ],
      },
      {
        test: require.resolve('react'),
        use: [
          {
            loader: 'expose-loader',
            options: 'React',
          },
        ],
      },
      {
        test: require.resolve('react-dom'),
        use: [
          {
            loader: 'expose-loader',
            options: 'ReactDOM',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: WebpackLoaders.js,
      },
      {
        test: /\.css$/,
        use: [ExtractCssChunksPlugin.loader, ...WebpackLoaders.css],
      },
      {
        test: /\.(sass|scss)$/,
        use: [ExtractCssChunksPlugin.loader, ...WebpackLoaders.sass],
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
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(development ? 'development' : 'production'),
        PUBLIC_URL: JSON.stringify(publicUrl),
        PATH_CONTEXT: JSON.stringify(process.env.PATH_CONTEXT || '/'),
        BROWSER: JSON.stringify(browser),
      },
    }),
    new Dotenv({
      systemvars: true,
    }),
    new StylelintPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.ejs',
      template: resolve(__dirname, 'src', 'app', 'index.ejs'),
      inline: true,
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: false,
      },
      // Coloca variáveis para SSR
      url_context: process.env.PATH_CONTEXT
        ? `${publicUrl}${process.env.PATH_CONTEXT}`
        : publicUrl,
      helmet_title: '<%-helmet_title%>',
      helmet_meta: '<%-helmet_meta%>',
      helmet_link: '<%-helmet_link%>',
      jss_styles: '<%-jss_styles%>',
      loadable_preload: '<%-loadable_preload%>',
      content: '<%-content%>',
      initial_state: '<%-initial_state%>',
      loadable_bundles: '<%-loadable_bundles%>',
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: /runtime/,
      preload: /\.js$/,
      defaultAttribute: 'defer',
    }),
    new ExtractCssChunksPlugin({
      filename: development
        ? '[name].css'
        : 'static/css/[name].[contenthash:8].css',
      chunkFilename: development
        ? '[name].css'
        : 'static/css/[name].[contenthash:8].css',
      hot: development,
    }),
    new ReactLoadablePlugin({
      filename: development
        ? './tmp/dev-server/loadable.json'
        : './build/loadable.json',
    }),
    // development
    development && new RemoveServiceWorkerPlugin(),
    development &&
      new RemoveServiceWorkerPlugin({ filename: 'service-worker.js' }),
    development && new webpack.HotModuleReplacementPlugin(),
    development && new webpack.NoEmitOnErrorsPlugin(),
    development &&
      new ProgressBarPlugin({
        format: 'Build [:bar] :percent (:elapsed seconds)',
        clear: false,
      }),
    development &&
      new WriteFilePlugin({
        test: /\.(ejs)$/,
        useHashIndex: true,
      }),
    // Production
    !development &&
      new CopyWebpackPlugin([
        {
          from: resolve(__dirname, 'public', '**', '*'),
          to: resolve(__dirname, 'build'),
        },
      ]),
    !development &&
      new OfflinePlugin({
        relativePaths: false,
        publicPath: process.env.PATH_CONTEXT || '/',
        responseStrategy: 'network-first',
        caches: {
          main: ['/'],
          adicional: ['*.chunk.js', '*.css'],
        },
        externals: [
          '/',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
        ],
        excludes: ['service-worker.js'],
        ServiceWorker: {
          output: 'service-worker.js',
        },
        AppCache: false,
        safeToUseOptionalCaches: true,
      }),
  ].filter(x => x),
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 5,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};

if (!development) {
  config.optimization.minimizer = [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        compress: {
          inline: false,
          drop_console: true,
        },
        output: { comments: false },
      },
    }),
  ];
}

module.exports = config;
