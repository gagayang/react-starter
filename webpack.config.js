var config = require('./config');
var path = require('path');
var webpack = require('webpack');
var assetsPath = path.resolve(__dirname,'static', 'dist');
var hotFixPlugin = require("@beisen/hotfixplugin");
var commonModuleListPlugin = require('commonmodulelistplugin');

// var CopyWebpackPlugin = require('copy-webpack-plugin');
//     var CopyWebpackPluginConfig = new CopyWebpackPlugin([
//           { from: nodeRoot + '/@beisen/talent-core/dist/', to: options.Root }
//       ]);

module.exports = {
  context: path.resolve(__dirname, 'src'),
  devtool: 'source-map',
  entry: [
    // 'webpack-hot-middleware/client',
    // './main'

    'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './main'
  ],
  output: {
    path: assetsPath,
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot','babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css?$/,
        loaders: [ 'style', 'raw' ],
        include: __dirname
      },
      {
        test: /containers\/[^\/]+\/index\.js$/,
        loaders: ['bundle', 'babel'],
        include: path.join(__dirname, 'src','containers')
      }
    ]
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ["",".js"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __LC_APP_ID__: JSON.stringify(config.LC_APP_ID),
      __LC_APP_KEY__: JSON.stringify(config.LC_APP_KEY)
    })
    ,new webpack.ProvidePlugin({
            "React": "react"
     }),
     //定义特殊标签域的处理方式
     new webpack.DefinePlugin({
          __DEV__: JSON.stringify(JSON.parse(true || 'false'))
     })
    //优化-减少重复的输出
      //, new webpack.optimize.DedupePlugin()
    // , CopyWebpackPluginConfig
      // , ExtractTextPluginConfig
      , new webpack.optimize.CommonsChunkPlugin({
        name: "common",
          minChunks: Infinity
      })
      , new commonModuleListPlugin({
        filePath:assetsPath+'/listChunks'
      })
      // , new hotFixPlugin({
      //   mapModulePath: assetsPath + "/mapModuleFile"
      //   ,mapModuleFile:"/mapFile.js"
      //   ,filter:"src"
      //   ,target:'hotfix'
      //   ,hotfixFile:['src/containers/one/index.js']
      //   })
  ]
};