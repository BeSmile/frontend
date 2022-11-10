#!/usr/bin/env node
const express = require('express');
const path = require('path');
const engine = require('ejs-locals');
const chainWebpack = require('./webpack.server');
const minimist = require('minimist');

const webpack = require('webpack');


const middleware = require('webpack-dev-middleware'); //webpack hot reloading middleware

const cliMain = async () => {
  const app = express(), DIST_DIR = path.join(__dirname, '..');

  const args = minimist(process.argv.slice(2), {
    string: [
      'port',
    ]
  });

  app.engine('ejs', engine);
  const webpackConfig = await chainWebpack('bash');
  const compiler = webpack(webpackConfig); //move your `devServer` config from `webpack.config.js`
  const filePath = path.join(compiler.outputPath, 'index.html');

  // 资源public使用实际目录
  app.use(express.static(path.join(DIST_DIR, 'public')));

  app.use(middleware(compiler, {
    // webpack-dev-middleware options
    publicPath: webpackConfig.output.publicPath,
  }));
  
  app.use(require('webpack-hot-middleware')(compiler,{
    path: '/__webpack_hmr',
    // 支持配置express热加载 https://cstroman.medium.com/webpack-hot-module-replacement-with-express-5e4ac67f9faf
  }));
  
  app.get('*', (_, res, next) => {
    // 使用实际运行后的目录, 所有的路径请求指向虚拟目录下的index.html文件
    compiler.outputFileSystem.readFile(filePath, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });
  
  app.listen(args.port, () => console.log(`Example app listening on port ${args.port}!`));
};

// 判断当前文件是否直接被调用
if (require.main === module) {
  cliMain();
}
