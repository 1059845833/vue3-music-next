const { defineConfig } = require('@vue/cli-service');
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
});
