const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false // 取消开发环境错误/警告全屏覆盖
    }
  }, 
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ]
  },
  chainWebpack(config) {
    config.module
      // 规则
      .rule('svg')
      .exclude.add(resolve('src/icons')).end();
    config.module
      // 规则
      .rule('icons')
      // 正则，解析 .svg格式文件
      .test(/.svg$/)
      // 解析的文件
      .include.add(resolve('src/icons')).end()
      // 新增了一个解析的loader
      .use('svg-sprite-loader')
      //具体的loader
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
  }
})
