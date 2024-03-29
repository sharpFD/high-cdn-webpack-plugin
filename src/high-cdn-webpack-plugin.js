//const {error} = require('console');
const {createCssElement,createJsElement} = require('./createElement');

const name = 'HighCdnWebpackPlugin'
const cheerio = require('cheerio')
var userOptions = {}

class HighCdnWebpackPlugin {
    constructor(options = {}) {
        this.userOptions = options || {};
        this.version = HighCdnWebpackPlugin.version;
      }
    apply(compiler) {
        const userOptions = this.userOptions;
        /* 
            js : [{
                external : '',
                path : 'cdn.com',
                replacementPath : 'cdn2.com'
            }]
        */
        const defaultOptions = {
            template: 'index.html',
            js: [],
            css: []
        };

        const options = Object.assign(defaultOptions, userOptions);

        /* compiler.hooks.compile.tap('MyPlugin', (params) => {
            // add external
            let jsExternals = userOptions.js.map(item => item.external)
            let external = {}

            jsExternals.forEach(item => {
                external = {
                    ...external,
                    ...item
                }
            })
            compiler.options.external = external
          }); */

        compiler.hooks.emit.tap(name, compilation => {
            const resourceNames = Object.keys(compilation.assets)
            let findTemplate = resourceNames.find(item => item === options.template)
            
            if(!findTemplate) {
                console.error(`[${name} error] =>> can not find the template ${options.template} at your dist bundle, please checkout your output file!`)
            } else {
                const resource = compilation.assets[findTemplate].source()
                const $ = cheerio.load(resource)

                // generate css fragment
                options.css.forEach(css=> {
                    $(createCssElement(css)).appendTo('head')
                })
                // generate js fragment
                options.js.forEach(js=> {
                    $(createJsElement(js.external, js.path, js.replacementPath)).appendTo('head')
                })
                
                compilation.assets[findTemplate] = {
                    source: () => $.html(),
                    size : () => $.html().length
                }
            }
        })
    }
}

HighCdnWebpackPlugin.version = 1
module.exports = HighCdnWebpackPlugin;