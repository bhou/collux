var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var version = require("./package.json").version;
var CompressionPlugin = require("compression-webpack-plugin");

var PROD = (process.env.NODE_ENV === 'production');

var web_entry = {};
if (PROD) {
  web_entry["collux.min.latest"] = './lib/web-entry.js';
  web_entry[`collux.min.v${version}`] = './lib/web-entry.js';
} else {
  web_entry["collux.latest"] = './lib/web-entry.js';
  web_entry[`collux.v${version}`] = './lib/web-entry.js';
}

module.exports = [
  {
    entry: web_entry,
    output: {
        path: PROD ? path.join(__dirname, "dist") : path.join(__dirname, "dist"),
        filename: "[name].js"
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a legal name to reference
          query: {
            presets: ['react', 'es2015']
          }
        }
      ]
    },
    plugins: PROD ? [
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: { comments: false }
      }),

      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ] : [],
  }
];
