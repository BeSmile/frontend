const generateRouter = require('./generateRouter');
const gulp = require('gulp');
const path = require('path');
const fancyLog = require('fancy-log');

const watchDir = path.join(__dirname, '../../../src/pages');

const watchRouterNamesTask = function() {
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
  apply(compiler) {
    compiler.hooks.afterEnvironment.tap('GenerateRouterPlugin', ()=>{
      generateRouter();
      this.watcher = watchRouterNamesTask();
    });
    compiler.hooks.watchClose.tap('GenerateRouterPlugin', () =>  {
      fancyLog.info('webpack closed');
      this.watcher.unwatch();
      this.watcher.close();
    });
  }
}

module.exports = GenerateRouterPlugin;