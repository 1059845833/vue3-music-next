const { defineConfig } = require('@vue/cli-service');
const registerRouter = require('./backend/router');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    // 全局引入scss文件, 无需在每个组件中再次手动导入
    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: ['./src/assets/scss/variable.scss', './src/assets/scss/mixin.scss'],
        })
        .end();
    });
  },
  devServer: {
    onBeforeSetupMiddleware(devServer) {
      registerRouter(devServer.app);
    },
    // setupMiddlewares(middlewares, devServer) {
    //   console.log(devServer);
    //   registerRouter(devServer.app);
    //   // 如果你想在所有其他中间件之前运行一个中间件或者当你从 `onBeforeSetupMiddleware` 配置项迁移时，
    //   // 可以使用 `unshift` 方法
    //   middlewares.unshift({
    //     name: 'first-in-array',
    //     // `path` 是可选的
    //     path: '/foo/path',
    //     middleware: (req, res) => {
    //       res.send('Foo!');
    //     },
    //   });
    // },
  },
  configureWebpack: config => {
    if (process.env.npm_config_report) {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
      config.plugins.push(new BundleAnalyzerPlugin());
    }
  },
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/music-next/' : '/',
  lintOnSave: false,
});
