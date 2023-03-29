#!/usr/bin/env node
const express = require('express');
const path = require('path');
const engine = require('ejs-locals');
const chainWebpack = require('./webpack.server');
const minimist = require('minimist');

const proxy = require('express-http-proxy');

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
  
  // 设置webContainer需要配置的策略
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Cross-Origin-Embedder-Policy', 'require-corp');
    res.header('Cross-Origin-Opener-Policy', 'same-origin');
    next();
  });
  
  app.use(require('webpack-hot-middleware')(compiler,{
    path: '/__webpack_hmr',
    // 支持配置express热加载 https://cstroman.medium.com/webpack-hot-module-replacement-with-express-5e4ac67f9faf
  }));
  const proxyServer = webpackConfig.devServer.proxy || {};
  for (const proxyPath in proxyServer) {
    const proxyData = proxyServer[proxyPath];
    if(!proxyData.target) {
      continue;
    }
  
    Object.entries(proxyData.pathRewrite).forEach(rewrite => {
      const reg = new RegExp(rewrite[0]);
  
      const prefix = proxyPath.replace(reg, rewrite[1]);
      console.log(proxyPath, proxyData.target + prefix);
    });
    
    app.use(proxyPath, proxy(proxyData.target, {
      //请求路径解析（可选）
      proxyReqPathResolver: function(req) {
        const originUrl = proxyPath + req.url;
        if('pathRewrite' in proxyData) {
          return Object.entries(proxyData.pathRewrite).reduce((url, next) => {
            const reg = new RegExp(next[0]);
            return url.replace(reg, next[1]);
          }, originUrl);
        }
        return originUrl;
      },
    }));
  }
  
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
