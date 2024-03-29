import MarkdownIt from 'markdown-it';
import  hljs from 'highlight.js'; // https://highlightjs.org
import  fancyLog from 'fancy-log';

const getLineNums = (lines: string[]) => {
  return lines.reduce((str, _, num) => str + `<span aria-hidden="true" serial="${num}"></span>`, '');
};

const md: MarkdownIt = new MarkdownIt({
  langPrefix:  'language-',
  html: true,
  typographer:  false,
  breaks:false,
  highlight: function (str, lang) {
    const lines = str.split(/\n/g);
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
  }
});

function loader(source: string) {
  const html = md.render(source);
  // line.replace(/\\(?:[1-7][0-7]{0,2}|[0-7]{2,3})/, '');
  return `const html = ${JSON.stringify(html)};export default function createMarkup() { return {__html: html} }`;
}

export default loader;