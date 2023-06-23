/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-04-01 18:12:00
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-14 16:44:29
 */
import  webpack from 'webpack';
// import fs from 'fs';
import   path from 'path';
import {ESBuildPlugin} from 'esbuild-loader';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniExtract from 'mini-css-extract-plugin';
import GenerateRouterPlugin from '../plugins/router/GenerateRouterPlugin';
import GenerateIconsPlugin from '../plugins/icons/generate-icons-plugin';
// import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

// const modelPath = path.resolve(__dirname, '..', '..', 'src', 'models');
//
// function getModel(modelPath) {
//   const models = [];
//
//   return new Promise((resolve) => {
//     fs.readdir(modelPath, function (err, files) {
//       if (err || typeof files === 'undefined') {
//         resolve([]);
//         return;
//       }
//       files
//         .filter((fileName) => fileName.indexOf('d.ts') < 0)
//         .forEach(function (filename) {
//           const res = filename.split('.');
//           models.push(res[0]);
//         });
//       resolve(models);
//     });
//   });
// }

const getPlugins = async () => {
  // const models = await getModel(modelPath);
  const plugins = [
    new ESBuildPlugin(),
    new webpack.DefinePlugin({
      ENV_PATH: JSON.stringify(false),
      MODELS_PATH: JSON.stringify([])
    }),
    new GenerateRouterPlugin(),
    new GenerateIconsPlugin(),
    // new CheckerPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['app', 'vendors', 'runtime'], //限定entry特定的块
      excludeChunks: ['dev-helper'], //排除entry特定的块
      filename: 'index.html',
      inject: true,
      hash: true,
      mountPoint: '<div id=\'root\'></div>',
      // value: '23',
      templateParameters: {
        context: {
          config: {
            publicPath: '/'
          }
        }
      },
      template: path.resolve('.', 'public', 'document.ejs') // 模板
    }),
    // new FriendlyErrorsWebpackPlugin(), // 错误友好提示plugin
    new ForkTsCheckerWebpackPlugin({
      // ? fork一个进程进行检查，并设置async为false，将错误信息反馈给webpack
      async: false,
      // eslint: true,
      // typescript: true,
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true
        }
      }
    }),
    // new CopyWebpackPlugin({
    //   patterns: [{
    //     from: path.resolve(__dirname, '..', '..','public'),
    //     to: path.join(__dirname, 'dist'),
    //   }],
    //   options: {

    //   },
    // })
  ];
  if (process.env.NODE_ENV === 'production') {
    plugins.push(
      new MiniExtract({
        filename: 'css/[name].css'
      })
    );
  }

  return plugins;
};

export default getPlugins;
