import * as path from 'path';
const env = process.env.NODE_ENV;
import * as MiniExtract from 'mini-css-extract-plugin';

// let gentsConfig = {};
// if (process.env.NODE_MODE !== 'plugin') {
//   gentsConfig = require('../../.gents');
// }

import babelLoader from './babel-loader';
import lessToJs from './lessToJs';
import * as fs from 'fs';

// 主题文件通过lessToJS 导入less中
const themeVariables = lessToJs(fs.readFileSync(path.resolve('src/styles/theme-file.less'), 'utf8'));

const cssLoader = {
  loader: 'css-loader',
  options: {
    import: true,
    // esModule: true,
    modules: {
      compileType: 'module', // 无效字段 不知道为什么
      // auto: true,// 无效字段 不知道为什么
      localIdentName: '[path][name]__[local]--[hash:base64:5]', // css文件名生成规则
      // localIdentRegExp: /page-(.*)\.css/i,
      // namedExport: true,
      // exportOnlyLocals: true,
      exportLocalsConvention: 'dashesOnly', // dashes -转化为驼峰，但是保留，dashesOnly只保留转化为驼峰后的
      localIdentHashPrefix: 'hash', // 无效字段 不知道为什么
      mode: (resourcePath: string) => {
        if (/pure.css$/i.test(resourcePath)) {
          return 'pure';
        }
        
        if (/(\w+).module.less/gi.test(resourcePath))
          return 'local'; // 组件内生效
        // if (isGlobalCssRule(resourcePath)) {
        //   return 'global'; // 全局css样式
        // }
        return 'global'; // 全局css样式
      }
    }
  }
};

const cssRules = [
  {
    test: /\.css$/,
    use: [
      require.resolve('style-loader'),
      cssLoader,
      // esbuild 支持style-loader
      {
        loader: 'esbuild-loader',
        options: {
          loader: 'css',
          minify: true
        }
      }
    ]
  },
  {
    test: /\.less$/,
    use: [
      // 生产环境进行css 拆分 开发环境依旧嵌入style
      env === 'production'
        ? {
          loader: MiniExtract.loader,
          options: {
            publicPath: '../'
          }
        }
        : {
          loader: 'style-loader'
        },
      cssLoader,
      {
        loader: 'less-loader',
        options: {
          // additionalData: (content, loaderContext) => {
          //   // More information about available properties https://webpack.js.org/api/loaders/
          //   const { resourcePath, rootContext } = loaderContext;
          //   const relativePath = path.relative(rootContext, resourcePath);
          
          //   if (relativePath === 'styles/foo.less') {
          //     return '@value: 100px;' + content;
          //   }
          
          //   return '@value: 200px;' + content;
          // },
          sourceMap: true,
          additionalData: `@env: ${process.env.NODE_ENV};`,
          webpackImporter: false,
          lessOptions: {
            // strictMath: true,
            importLoaders: 1,
            modules: true,
            javascriptEnabled: true, // 开启
            modifyVars: {
              // ...gentsConfig.theme,
              ...themeVariables
            } // 定义全局的主题样式
          }
        }
      }
    ]
  },
  {
    test: /\.scss$/,
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      },
      {
        loader: 'sass-loader',
        options: {
          modules: true
          // noIeCompat: true
        }
      }
    ]
  },
  {
    test: /\.(ttf|woff2)$/,
    use: ['file-loader']
  }
];
const devTsLoader = {
  test: /\.(ts|tsx)$/,
  loader: 'esbuild-loader',
  options: {
    loader: 'tsx',
    target: 'es2015'
    // tsconfigRaw: require('../../tsconfig.json'),
  }
};
const rules = [
  process.env.NODE_ENV !== 'production' ? babelLoader : devTsLoader,
  {
    test: /.md$/,
    loader: path.resolve(__dirname, '../loaders/md-loader.ts')
  },
  {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader'
      }
    ]
  },
  ...cssRules
  // {
  //   enforce: 'pre',
  //   test: /\.js$/,
  //   loader: 'source-map-loader',
  // },
];

export default rules;
