const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HighCdnWebpackPlugin = require('./index');

module.exports = {
  mode: 'production',
  devtool: 'none',
  entry: './src/high-cdn-webpack-plugin.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'this',
    libraryTarget: 'umd'
  },
  optimization : {
    minimize: false/* ,
    splitChunks : {
    chunks: 'all',
    cacheGroups: {
        libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
        },
        cheerIO: {
            name: 'chunk-cheerIO',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?cheerio(.*)/
        }
    }
} */
}
  ,
  plugins: [new HtmlWebpackPlugin({
    template: 'public/index.html'
  }), new HighCdnWebpackPlugin({
      template: 'index.html',
      js: [
        {
          external: {
            'vue': 'Vue'
          },
          path: 'https://cdn.staticfile.org/vue/2.5.16/vue.min.js',
          replacementPath: 'https://cdn.bootcdn.net/ajax/libs/vue/3.0.11/vue.cjs.min.js'
        },
        {
          external: {
            'vue-router': 'VueRouter',
          },
          path: 'https://cdn.staticfile.org/vue-router/3.0.1/vue-router2.min.js',
          replacementPath: 'https://cdn.bootcdn.net/ajax/libs/vue-router/4.0.6/vue-router.cjs.js'
        },
      ],
      css: ['https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.1/theme-chalk/index.min.css']
  })]
};