const { resolve } = require('path');

module.exports = {
  extensions: ['.js', '.jsx'],
  alias: {
    '@': resolve(__dirname, 'src', 'app'),
  },
  modules: ['node_modules'],
};
