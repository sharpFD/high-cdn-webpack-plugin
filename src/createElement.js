const { createHtmlTagObject, htmlTagObjectToString, HtmlTagArray } = require('./html-tags');

function createCssElement(path) {
    //return `<link as="style" href="${path}" rel="external nofollow" rel="preload" rel="external nofollow"></link>`
    return htmlTagObjectToString(createHtmlTagObject('link', {
        as : 'style',
        rel : 'stylesheet',
        href : path
    })) + '\n'
}

function createJsElement(external, path, replacementPath) {
    let externalV = null
    if(typeof external === 'object') {
        externalV = external[Object.keys(external)[0]]
    } else { 
        error(`[CdnWebpackPlugin error] =>> external except get a object but get not a object`)
        return ''
    }
    return appendSuitablePath(htmlTagObjectToString(createHtmlTagObject('script', {
        src : path,
        type : 'application/javascript'
    })), replacementPath, externalV)
}
function appendSuitablePath(pathStr, replacementPath, externalV) {
    let replacementStr = htmlTagObjectToString(createHtmlTagObject('script', {}, `!window.${externalV} && document.write(unescape('%3Cscript src="${replacementPath}"%3E%3C/script%3E'))`))
    return (pathStr + '\n' + replacementStr  + '\n')
}
module.exports = {createCssElement,createJsElement}