const path = require('path')

module.exports = {
  lintOnSave: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 需要使用绝对路径
      patterns: [
        path.join(__dirname, './src/assets/styles/mixins.less'),
        path.join(__dirname, './src/assets/styles/variables.less')
      ]
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, {
        limit: 10000
      }))
    config.devServer.disableHostCheck(true)
  },
  configureWebpack: {
    externals: {
      qc: 'QC'
    }
  }
}
