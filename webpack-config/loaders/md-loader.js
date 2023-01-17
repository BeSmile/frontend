const showdown  = require('showdown');
const Lazy = require('lazy');

class Reader  {
  stacks=[];
  line=undefined;
  constructor({ lines }) {
    this.stacks = lines;
  }
  next() {
    const line = this.stacks.shift();
    this.line = line;
    return line || undefined;
  }
}

const parse = (lines) => {
  const reader = new Reader({
    lines
  });
  let content = '';
  let collapse = false;
  while (reader.next()) {
    if(!collapse)  {
      content += reader.line;
    } else {
      content = content + reader.line + '\\n';
    }
    
    if(reader.line.indexOf('<pre>')) {
      collapse = true;
    } else if(reader.line.indexOf('</pre>')) {
      collapse = false;
    }
  }
  return content;
};

function loader(source) {
  const converter = new showdown.Converter(), html = converter.makeHtml(source);
  const lazy = new Lazy;
  let content = '';
  lazy
    .lines
    .map(String)
    .map(function(line) {
      return line.replace(/"/g, '\'');
    })
    .join(function (lines) {
      // 判断是否有存在pre标签内
      content = parse(lines);
    });
  lazy.emit('data', html);
  lazy.emit('end');
  return `const html = "${content}";export default function createMarkup() { return {__html: html} }`;
}

module.exports = loader;