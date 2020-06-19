module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    resolve: {
       symlinks: false
    }
  },
  transpileDependencies: [
    '@coreui/utils'
  ],
  outputDir: process.env.NODE_ENV === 'production'
    ? 'release-stc-student/'
    : 'dev-stc-student',
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
  configureWebpack: {
    output: {
      filename: 'js/[name].[hash:8].js',
      chunkFilename: 'js/[name].[hash:8].js'
    }
  }
}
