const path = require('path');

module.exports = {
  entry: './frontend/index.jsx',
  output: {filename: './static/js/bundle.js'},
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/ ],
        exclude: /node-modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  }
};
