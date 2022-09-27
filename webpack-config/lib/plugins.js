/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-04-01 18:12:00
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-14 16:44:29
 */
const webpack = require('webpack');
const fs = require('fs');
const { ESBuildPlugin } = require('esbuild-loader');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniExtract = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const CopyWebpackPlugin = require("copy-webpack-plugin");

const path = require('path');
const modelPath = path.resolve(__dirname, '..', '..', 'src', 'models');

function getModel(modelPath) {
    let models = [];

    return new Promise((resolve) => {
        fs.readdir(modelPath, function (err, files) {
            if (err || typeof files === 'undefined') {
                resolve([]);
                return;
            }
            files
                .filter((fileName) => fileName.indexOf('d.ts') < 0)
                .forEach(function (filename) {
                    const res = filename.split('.');
                    models.push(res[0]);
                });
            resolve(models);
        });
    });
}
const getPlugins = async () => {
    const models = await getModel(modelPath);
    const plugins = [
        new ESBuildPlugin(),
        new webpack.DefinePlugin({
            ENV_PATH: JSON.stringify(false),
            MODELS_PATH: JSON.stringify(models)
        }),
        // new CheckerPlugin(),
        new HtmlWebpackPlugin({
            chunks: ['app'], //限定entry特定的块
            excludeChunks: ['dev-helper'], //排除entry特定的块
            filename: 'index.html',
            inject: true,
            hash: new Date().getTime(),
            mountPoint: '<div id=\'root\'></div>',
            // value: "23",
            templateParameters: {
                context: {
                    config: {
                        publicPath: '/'
                    }
                }
            },
            template: path.resolve('.', 'public', 'document.ejs') // 模板
        }),
        new FriendlyErrorsWebpackPlugin(), // 错误友好提示plugin
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
        })
        // new CopyWebpackPlugin({
        //   patterns: [{
        //     from: path.resolve(__dirname, "..", "..","public"),
        //     to: path.join(__dirname, "dist"),
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

module.exports = getPlugins;
