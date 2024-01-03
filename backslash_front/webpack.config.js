const { resolve, join } = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  entry: {
    index: './src/index.tsx'
  },
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'bundle.js',
    clean: true,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'development')
    }),
    new CopyPlugin({
      patterns: [
        {
          from: join(__dirname, '/public/favicon.ico'),
          to: join(__dirname, '/build/favicon.ico')
        }
      ].filter(Boolean)
    }),
    isDev && new ReactRefreshPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ].filter(Boolean),
  ...(isDev
    ? {
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
          host: 'localhost',
          port: 4000,
          open: true,
          hot: true,
          compress: true,
          historyApiFallback: true
        }
      }
    : {
        mode: 'production',
        optimization: { minimizer: [new TerserWebpackPlugin()] }
      })
}

module.exports = config
