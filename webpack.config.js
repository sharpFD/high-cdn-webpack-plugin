const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CdnWebpackPlugin = require('./src/cdn-webpack-plugin');


module.exports = {
  mode: 'production',
  devtool: 'none',
  entry: './src/cdn-webpack-plugin.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'public/index.html'
  }), new CdnWebpackPlugin({
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