const antdTheme = require('./src/theme.js')
module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      less: {
        modifyVars: antdTheme,
        javascriptEnabled: true,
      },
    },
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },
}
