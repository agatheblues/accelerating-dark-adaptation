const path = require('path')
const webpack = require('webpack')
const ProvidePlugin = webpack.ProvidePlugin

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: ['./js/script.js'],
  output: {
    filename: 'bundle.js'
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, './node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: [/node_modules/],
        loader: 'eslint-loader',
        options: {
          // eslint options (if necessary)
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              [
                "@babel/preset-env", {
                  corejs: "2.6.5",
                  debug: false,
                  modules: false,
                  targets: [">1%", "safari 11", "edge > 15"],
                  useBuiltIns: "entry",
                }
              ]
            ]
          }
        }
      },
    ],
  },
  plugins: [],
}