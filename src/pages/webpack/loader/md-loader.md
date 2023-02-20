# 在 webpack 中支持 md 文件

```js
const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js'); // https://highlightjs.org
const fancyLog = require('fancy-log');

const getLineNums = (lines) => {
  return lines.reduce((str, _, num) => str + `<span aria-hidden="true" serial="${num}"></span>`, '');
};

const md = new MarkdownIt({
  langPrefix: 'language-',
  html: true,
  typographer: false,
  breaks: false,
  highlight: function (str, lang) {
    let lines = str.split(/\n/g);
    lines.pop();
    const lineCode = `<span class="line-serial-nums">${getLineNums(lines)}</span>`;

    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code lang="${lang}">${lineCode}${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`;
      } catch (error) {
        fancyLog.error(error);
      }
    }

    return `<pre class="hljs"><code>${lineCode}${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

function loader(source) {
  const html = md.render(source);
  // line.replace(/\\(?:[1-7][0-7]{0,2}|[0-7]{2,3})/, '');
  return `const html = ${JSON.stringify(html)};export default function createMarkup() { return {__html: html} }`;
}

module.exports = loader;
```

## 解析 code 代码中遇到正则\1 反向引用的问题

首先问题出现于以下问题

```
Module parse failed: Octal literal in strict mode (1:41)
File was processed with these loaders:
 * ./webpack-config/loaders/md-loader.js
You may need an additional loader to handle the result of these loaders.
```

这时候来看`Octal literal`问题,您的正则表达式包含\1，它被解释为八进制，在严格模式下,无法使用八进制字符

解决方法

对解析完成之后的代码通过`JSON.stringify`对代码进行一次转义
