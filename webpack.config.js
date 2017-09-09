var path = require('path')
var webpack = require('webpack')
var NpmInstallPlugin = require('npm-install-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
  './src/css/style.scss',
  'webpack-hot-middleware/client',
  'babel-polyfill',
  './src/index'
  ],
  devServer: {
      historyApiFallback: true,
      contentBase: './',
      hot: true
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
  new ExtractTextPlugin('styles.css', {
    allChunks: true
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new NpmInstallPlugin()
  ],
  module: {
    preLoaders: [
    {
      test: /\.js$/,
      loaders: ['eslint'],
      include: [
      path.resolve(__dirname, "src"),
      ],
    }
    ],
    loaders: [
    {
      loaders: ['react-hot', 'babel-loader'],
      include: [
      path.resolve(__dirname, "src"),
      ],
      test: /\.js$/,
      plugins: ['transform-runtime'],
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!resolve-url!sass-loader?sourceMap')
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    },
    {
      test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
      loader: 'file-loader'
    }
    ]
  }
}
