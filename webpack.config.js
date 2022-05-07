/* eslint-disable no-undef */
const path = require('path');

module.exports = {
  entry: './scripts/main.js',
  output: {
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, 'scripts'),
    filename: 'bundle.js',
  },
  mode: 'development',
  devServer: {
    open: true,
    static: {
      directory: './scripts',
      watch: true
    },
  },
  // watch: true,
};
