import generateRouter from './generateRouter';
import gulp from 'gulp';
import path from 'path';
import fancyLog from 'fancy-log';
import { Compiler } from 'webpack';
import fs from 'fs';

const watchDir = path.join(__dirname, '../../../src/pages');

const watchRouterNamesTask = function(): fs.FSWatcher {
  const watcher = gulp.watch([`${watchDir}/**/*.tsx`]);
  fancyLog.info(`start watch ${watchDir}`);
  
  watcher.on('ready', function () {
    ['add', 'unlink', 'addDir', 'unlinkDir'].forEach(function(type) {
      watcher.on(type, function(filePath, stats) {
        fancyLog.info(`File ${filePath} was ${type}`, stats);
        generateRouter();
      });
    });
  });
  
  return watcher;
};

class GenerateRouterPlugin {
  apply(compiler: Compiler) {
    let watcher: fs.FSWatcher;
    compiler.hooks.afterEnvironment.tap('GenerateRouterPlugin', ()=>{
      generateRouter();
      watcher= watchRouterNamesTask();
    });
    compiler.hooks.watchClose.tap('GenerateRouterPlugin', () =>  {
      fancyLog.info('webpack closed');
      // watcher.unwatch();
      watcher.close();
    });
  }
}

export default GenerateRouterPlugin;