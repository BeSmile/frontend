import { Compiler } from 'webpack';
import csstree, { Raw } from 'css-tree';
import fs from 'fs';
import { RUNTIME_DIRECTORY, THEME_LIST, THEME_PATH } from '../../constants';
import { mkdir } from '../../lib/utils';
import ejs from 'ejs';
import path from 'path';
import fancyLog from 'fancy-log';
type IconObject = {
  theme: string;
  name: string;
}

const PLUGIN_NAME = 'plugin-icons';

const inThemes = (bloc: Raw) => {
  return THEME_LIST.some((theme: string) => {
    const reg = new RegExp(`^.${theme};?`);
    return reg.test(bloc.value);
  });
};


export const astVariables = () => {
  const lessText = fs.readFileSync(THEME_PATH).toString('utf-8');
  const icons: IconObject[] = [];
  const ast = csstree.parse(lessText);

// traverse AST and modify it
  csstree.walk(ast, (node) => {
    if (node.type === 'Rule') {
      const prelude = node.prelude;
      const block = node.block;
      if(prelude.type !== 'SelectorList') {
        return;
      }
      prelude.children.forEach(selector => {
        if (selector.type !== 'Selector') {
          return;
        }
        const isPseudo = selector.children.some(selector => selector.type === 'PseudoElementSelector');
        if(!isPseudo) {
          return;
        }
        const classSelector = selector.children.first;
        if(!classSelector || classSelector.type!== 'ClassSelector') {
          return;
        }
        const name = classSelector.name;
        const themes = block.children.filter((bloc) : bloc is  Raw => {
          if(bloc.type !== 'Raw') {
            return false;
          }
          return bloc.type === 'Raw' && inThemes(bloc);
        });
        themes.forEach(theme => {
          icons.push({
            theme: theme.value.replace(/[.;]/g, ''),
            name,
          });
        });
      });
    }
  });
  return icons;
};
const pluginPath = path.join(RUNTIME_DIRECTORY, PLUGIN_NAME);
class GenerateIconsPlugin {
  apply(compiler: Compiler) {
    compiler.hooks.afterEnvironment.tap('GenerateIconsPlugin', function() {
      mkdir(pluginPath);
      const values = astVariables();
      ejs.renderFile(path.resolve(__dirname, './template.ejs'), { values }, (err, str) => {
        if(err) {
          fancyLog.error(err);
          return;
        }
        const pagePath = path.join(pluginPath, 'page.tsx');
        const isExistPage = fs.existsSync(pagePath);
        if(!isExistPage) {
          fs.writeFile(pagePath, str, {
            encoding: 'utf8',
            flag: 'w',
            mode: 0o666
          }, (err) => {
            if (err){
              fancyLog.error('写入文件失败' + err);
            }
          });
        }
      });
    });
  }
}

export default GenerateIconsPlugin;