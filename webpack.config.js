"use strict";

const NODE_ENV = process.env.NODE_ENV || 'dev';

module.exports = {
  entry: {
    'main.min': './dev/js/main.js',
    'foundation.min': './dev/js/foundation.js'
  },
  output: {
    path: __dirname + '/prod/js',
    filename: '[name].js'
  },
  devtool: NODE_ENV == 'dev' ? 'cheap-source-map' : null,

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },

  plugins: [
    new $.gp.webpack.webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    })
  ],

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    modulesTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  }
};


if (NODE_ENV == 'prod') {
  module.exports.plugins.push(
    new $.gp.webpack.webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  );
}