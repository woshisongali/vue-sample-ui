const webpack = require('webpack')
const server = require('./server')
// require('')
const mockConfig = {
  '/birds': './birds',
  '/downTest': '../components/down-select/mock/product'
}
module.exports = () => ({
  devServer: {
    port: 7000,
    proxy: {
    },
    before (app) {
      console.log('============= before server')
      server.start(mockConfig)
    }
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [ "style-loader", "css-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      { test: /\.(gif|png|jpg|woff|svg|ttf|eot)$/, 
        use: [{
          loader:'url-loader',
          options: {
            limit:500//当图片小于这个值他会生成一个图片的url 如果是一个大于的他会生成一个base64的图片在js里展示
          } 
        }]
      }
    ]
  },

  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  },

  plugins: [
    // new webpack.HotModuleReplacementPlugin()
  ]
});
