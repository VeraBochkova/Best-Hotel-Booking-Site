const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}

const PAGES_DIR = `${PATHS.src}/pug`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src
  },
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: '/node_modules/',
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.cjs', '.less']
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png\jpg\gif\svg\ico)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(woff(2)?\ttf\woff\eot\svg)(\?v=\d+\.\d+\.\d+)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap: true}
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: './postcss.config'
              }
            }
          }] 
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap: true}
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
                config: {
                  path: './postcss.config'
                }
            }
          },
          {
            loader: 'less-loader',
            options: {sourceMap: true}
          }]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`
    }),
    new CopyWebpackPlugin([
      {from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img`},
      {from: `${PATHS.src}/modules/checkbox/Vector`, to: `${PATHS.assets}img`},
      {from: `${PATHS.src}/modules/radio-button/Rectangle 2.1`, to: `${PATHS.assets}img`},
      {from: `${PATHS.src}/modules/toggle/Rectangle 2.1-grey`, to: `${PATHS.assets}img`},
      {from: `${PATHS.src}/modules/like-button/Rectangle 2`, to: `${PATHS.assets}img`},
      /*{from: `${PATHS.src}/modules/rate-button/star`, to: `${PATHS.assets}img`},*/
      {from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts`},
      {from: `${PATHS.src}/${PATHS.assets}static`, to: `${PATHS.assets}static`}
    ]),
    new webpack.ProvidePlugin({
      $: `jquery`,
      jQuery: `jquery`
    }),
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`
    }))//,
    //new HtmlWebpackPlugin({
      //template: `${PAGES_DIR}/UIKit.pug`,
      //filename: './UIKit/UIKit.html',
      //inject: true
    //})
  ]
}