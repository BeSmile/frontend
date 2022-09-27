#!/usr/bin/env node
const express = require('express');
const chainWebpack = require('./webpack.server');
const minimist = require('minimist');
const app = express();
const webpack = require('webpack');

const cliMain = async () => {
  const args = minimist(process.argv.slice(2), {
    string: [
      'port',
    ]
  });
  const middleware = require('webpack-dev-middleware'); //webpack hot reloading middleware
  const compiler = webpack(await chainWebpack()); //move your `devServer` config from `webpack.config.js`
  app.use(middleware(compiler, {
    // webpack-dev-middleware options
  }));

  app.listen(args.port, () => console.log('Example app listening on port 3000!'));

};

// 判断当前文件是否直接被调用
if (require.main === module) {
  cliMain();
}
