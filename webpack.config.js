const path = require('path');

module.exports = {
  entry: './frontend/index.js',
  output: {filename: './static/bundle.js'},
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node-modules/,
        loader: 'babel-loader',
        query: {presets: ['react', 'es2015']}
      }
    ]
  }
};
