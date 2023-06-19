import  path from 'path';
import rules from './lib/rule';
import getPlugins from './lib/plugins';
import proxy, { DEV_SERVER_ENV } from './lib/proxy';
import  minimist from 'minimist';
import  ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import  webpack from 'webpack';
// import csstree from 'css-tree';
// let config = {};

// console.log(csstree);
const isDevelopment = process.env.NODE_ENV !== 'production';

// const ast = csstree.parse('.example { world: "!" }');

// traverse AST and modify it
// csstree.walk(ast, (node) => {
//   console.log(node ,'node' +
//     '');
//   if (node.type === 'ClassSelector' && node.name === 'example') {
//     node.name = 'hello';
//   }
// });

// generate CSS from AST
// console.log(csstree.generate(ast));

// if (process.env.NODE_MODE !== 'plugin') {
//   config = require('../.gents.ts');
// }
const args = minimist(process.argv.slice(2), {
  string: [
    'env',
    'port',
    'host'
  ]
});

const env = args.env as DEV_SERVER_ENV;

function isNilBoolean<T>(argument: T | false): argument is T {
  return argument !== false;
}

// 生成webpack文件
async function renderWebpack(execEnv = 'webpack'): Promise<webpack.Configuration> {
  const plugins = await getPlugins();
  
  return {
    stats: 'errors-warnings',
    mode: 'development',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, '..', 'src'),
      }
    },
    entry: {
      app: [
        path.resolve(__dirname, '..', 'src', 'index.tsx'),
        execEnv === 'bash' && 'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
      ].filter(isNilBoolean),
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
    ].filter(isNilBoolean),
    devServer: {
      host: args.host,
      hot: true,
      // contentBase: path.join(__dirname, '..', 'public'), // 用于指定资源目录
      compress: true,
      port: args.port,
      historyApiFallback: true,
      // clientLogLevel: 'silent',
      // before: function (app, server, compiler) {
      //   app.get("/some/path", function (req, res) {
      //     res.json({ custom: "response" });
      //   });
      // }
      proxy: proxy[env],
    },
    externals: {
      './cptable': 'var cptable',
      '../xlsx.js': 'var _XLSX'
    },
    watchOptions: {
      // for some systems, watching many files can result in a lot of CPU or memory usage
      // https://webpack.js.org/configuration/watch/#watchoptionsignored
      // don't use this pattern, if you have a monorepo with linked packages
      ignored: /node_modules/,
    },
  } as webpack.Configuration;
}

export default renderWebpack;
