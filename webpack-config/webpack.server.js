const path = require('path');
const rules = require('./lib/rule.js');
const getPlugins = require('./lib/plugins');
const proxy = require('./lib/proxy');
const minimist = require('minimist');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

let config = {};

const isDevelopment = process.env.NODE_ENV !== 'production';

if (process.env.NODE_MODE !== 'plugin') {
  config = require('../.gents.ts');
}
const args = minimist(process.argv.slice(2), {
  string: [
    'env',
    'port',
    'host'
  ]
});

// 生成webpack文件
async function renderWebpack(execEnv = 'webpack') {
  const plugins = await getPlugins();
  
  return {
    stats: 'errors-warnings',
    mode: 'development',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: config.alias
    },
    entry: {
      app: [
        path.resolve(__dirname, '..', 'src', 'index.tsx'),
        execEnv === 'bash' && 'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
      ].filter(app => app),
      'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
      'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
      'css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
      'html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
      'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker'
    },
    output: {
      path: path.resolve(__dirname, '.', 'dist'), // 输出的路径
      filename: '[name]-[chunkhash].js',
      publicPath: '/',
      // publicPath: path.resolve(__dirname, "..", "public"),
      library: 'APP',
      libraryTarget: 'window',
      globalObject: 'self',
    },
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
    resolveLoader: {
      // alias: {
        // "db-loader": path.resolve(__dirname, ".","babel-loader.js")
        // "no-console-loader": path.resolve(__dirname, "loaders/no-console.ts")
      // }
      modules: ['node_modules', path.resolve(__dirname, 'loaders')],
    },
    devtool: 'eval-source-map',
    module: {
      rules: rules
    },
    target: 'web',
    plugins: [
      ...plugins,
      isDevelopment && new ReactRefreshWebpackPlugin(),
      execEnv === 'bash'  && new webpack.HotModuleReplacementPlugin(),
    ].filter(Boolean),
    devServer: {
      host: args.host,
      hot: true,
      contentBase: path.join(__dirname, '..', 'public'), // 用于指定资源目录
      compress: true,
      port: args.port,
      historyApiFallback: true,
      clientLogLevel: 'silent',
      // before: function (app, server, compiler) {
      //   app.get("/some/path", function (req, res) {
      //     res.json({ custom: "response" });
      //   });
      // }
      proxy: proxy[args.env],
    },
    externals: {
      './cptable': 'var cptable',
      '../xlsx.js': 'var _XLSX'
    }
  };
}

module.exports = renderWebpack;
