var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: "./frontend/index.jsx",
  output: {
    path: "./static/js",
    filename: "bundle.js"
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  ],
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/ ],
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-rest-spread']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js", ".jsx"]
  }
};
