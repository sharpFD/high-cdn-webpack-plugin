# DEPRECATED

<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![license][license]][chat-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]


# 一、插件介绍
high-cdn-webpack-plugin是Webpack一款插件，用来在index.html引用的CDN服务器宕机后自动替换CDN地址，实现CDN高可用的服务状态，需要配合html-webpack-plugin生成的模板html动态注入。

实现效果：

使用前:

[![gGChIH.png](https://z3.ax1x.com/2021/05/08/gGChIH.png)](https://imgtu.com/i/gGChIH)

使用后：

[![gGPwOf.png](https://z3.ax1x.com/2021/05/08/gGPwOf.png)](https://imgtu.com/i/gGPwOf)


# 二、插件使用 

## 1. 安装

```shell
npm install high-cdn-webpack-plugin --save
```

## 2. 使用

确定模板文件中存在<head>标签，否则插件无法正常找到脚本插入点：

```html
<!DOCTYPE html>
<html lang="en">
<head> <!-- 存在head标签才能使用 -->
    <meta charset="UTF-8">
    <title>hello world</title>
</head>
<body>
   
</body>
</html>
```


引入插件，并实例化：
```js
// webpack.config.js

const HighCdnWebpackPlugin = require("high-cdn-webpack-plugin");

module.exports = {
  // ... 省略其他配置
  plugins: [
    // ... 省略其他插件
    new HighCdnWebpackPlugin({
      template: 'index.html',
      js: [
        {
          external: {
            'vue': 'Vue'
          },
          path: 'https://cdn.staticfile.org/vue/2.5.16/vue.min.js',
          replacementPath: '/vue/3.0.11/vue.cjs.min.js'
        },
        {
          external: {
            'vue-router': 'VueRouter',
          },
          path: 'https://cdn.staticfile.org/vue-router/3.0.1/vue-router2.min.js',
          replacementPath: '/vue-router/4.0.6/vue-router.cjs.js'
        },
      ],
      css: ['https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.1/theme-chalk/index.min.css']
  })  
  ]
}
```

# 三、Vuejs 使用

```js
// vue.config.js

const HighCdnWebpackPlugin = require("high-cdn-webpack-plugin");
module.exports = {
  // ... 省略其他配置
  configureWebpack: {
    plugins: [
      // ... 省略其他插件
      new HighCdnWebpackPlugin()  
    ]
  }
}
```

# 四、其他


## Options

|属性|类型|必填|说明|
|---|---|---|---|
|template|String|N|打包目录下模板文件名称，默认为index.html
|css|Array|N|Css cdn地址，css暂不支持高可用|
|js|Array|Y|Js文件cdn地址，格式如下方

```javascript
    {
          external: {   // CDN module export 声明
            'vue': 'Vue'
          },
          path: 'https://cdn.staticfile.org/vue/2.5.16/vue.min.js', // CDN地址
          replacementPath: 'https://cdn.bootcdn.net/ajax/libs/vue/3.0.11/vue.cjs.min.js' // path CDN失效后，将用此个地方的地址代替，一般使用自己服务器上的静态文件地址
    }
```

## License

[MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/high-cdn-webpack-plugin.svg
[license]: https://img.shields.io/github/license/mashape/apistatus.svg
[license-url]: https://github.com/sharpFD/high-cdn-webpack-plugin/blob/master/LICENSE
[npm-url]: https://npmjs.com/package/high-cdn-webpack-plugin
[node]: https://img.shields.io/node/v/high-cdn-webpack-plugin.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/high-cdn-webpack-plugin.svg
[deps-url]: https://david-dm.org/webpack-contrib/high-cdn-webpack-plugin
[tests]: https://dev.azure.com/webpack-contrib/high-cdn-webpack-plugin/_apis/build/status/webpack-contrib.high-cdn-webpack-plugin?branchName=master
[tests-url]: https://dev.azure.com/webpack-contrib/high-cdn-webpack-plugin/_build/latest?definitionId=8&branchName=master
[cover]: https://codecov.io/gh/webpack-contrib/high-cdn-webpack-plugin/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/high-cdn-webpack-plugin
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=high-cdn-webpack-plugin
[size-url]: https://packagephobia.now.sh/result?p=high-cdn-webpack-plugin