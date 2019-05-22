const path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve('__dirname', 'dist'),
    filename: 'bundle.js',
    publicPath: ''
  },
  resolve: {
    /* 當 import file 沒有指定副檔名時該抓哪些種類的副檔名 import 進來 */
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader:
        exclude: /node_modules/
      }
    ]
  }
}