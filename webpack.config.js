const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Trocapp',
      template: './src/public/index.html',
    }),
    new CopyWebpackPlugin([{
      from: './src/public/css',
      to: 'css',
      toType: 'dir',
    },
    {
      from: './node_modules/materialize-css/dist/css/materialize.min.css',
      to: 'css/materialize.min.css',
      toType: 'file',
    },
    {
      from: './node_modules/materialize-css/dist/js/materialize.min.js',
      to: 'js/materialize.min.js',
      toType: 'file',
    }]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
  devServer: {
    inline: true,
    contentBase: './build',
    port: 9000,
  },
};
