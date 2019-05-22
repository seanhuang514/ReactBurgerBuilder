const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[id].js',
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
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          /* 
            * IMPORTANT
            webpack parses loaders in this use array and applies them from right to left,
            so from bottom to top if we write it like this.
          */
          /* yarn add css-loader style-loader --dev */
          { loader: 'style-loader' },
          { 
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]'/* [] */
            }
          },
          { 
            loader: 'postcss-loader', /* yarn add postcss-loader --dev */
            options: {
              ident: 'postcss',
              plugins: () => {
                /* yarn add autoprefixer --dev  */
                autoprefixer({
                  browsers: [ 
                    /* https://github.com/browserslist/browserslist */
                    "> 1%",
                    "last 2 versions"
                  ]
                })
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=8000&name=images/[name].[ext]' // bytes
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: __dirname + '/src/index.html',
        filename: 'index.html',
        inject: 'body'
    })
  ]
}