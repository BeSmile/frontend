const path = require('path');
const fancyLog = require('fancy-log');
const rules = require('./lib/rule.js');
const getPlugins = require('./lib/plugins');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const util = require('../lib/util');
// var child_process = require("child_process");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

// const {
//     CheckerPlugin
// } = require("awesome-typescript-loader");

let config = {};

if (process.env.NODE_MODE !== 'plugin') {
    config = require('../.gents.ts');
}

const outputPath = path.resolve('dist');

// 生成webpack文件
async function renderWebpack() {
    fancyLog(`clean ${outputPath}`);

    await util.rimraf(outputPath)();
    const plugins = await getPlugins();

    return {
        stats: 'none', // 错误提示
        mode: 'production',
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            alias: config.alias
        },
        entry: {
            app: path.resolve('src', 'index.tsx')
            // vendors: ['react', 'react-dom', 'lodash', 'react-dom-router'],
        },
        output: {
            path: outputPath, // 输出的路径
            filename: '[name]-[chunkhash].js',
            publicPath: '/',
            // publicPath: path.resolve(__dirname, "..", "public"),
            library: 'APP',
            libraryTarget: 'window'
        },
        // externals: {
        //     "react": "React",
        //     "react-dom": "ReactDOM"
        // },
        resolveLoader: {
            alias: {
                // "db-loader": path.resolve(__dirname, ".","babel-loader.js")
            }
        },
        // devtool: "eval-source-map",
        module: {
            rules: rules
        },
        target: 'web',
        plugins: plugins,
        // externals: {
        //     "react": "react",
        //     "react-dom": "ReactDOM"
        // }
        optimization: {
            // 设置runtimeChunk是将包含chunks 映射关系的 list单独从 app.js里提取出来，因为每一个 chunk 的 id 基本都是基于内容 hash 出来的，所以每次改动都会影响它，如果不将它提取出来的话，等于app.js每次都会改变。缓存就失效了。设置runtimeChunk之后，webpack就会生成一个个runtime~xxx.js的文件。
            runtimeChunk: {
                name: 'runtime'
            },
            minimizer: [
                new ESBuildMinifyPlugin({
                    target: 'es2015',
                    css: true
                })
            ],
            // 拆分所有的node_modules的包进入vendors文件
            splitChunks: {
                //     chunks: 表示哪些代码需要优化，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为async
                //          initial , all 模式会将所有来自node_modules的模块分配到一个叫vendors的缓存组；所有重复引用至少两次的代码，会被分配到default的缓存组。
                //     minSize: 表示在压缩前的最小模块大小，默认为30000
                //     minChunks: 表示被引用次数，默认为1
                //     maxAsyncRequests: 按需加载时候最大的并行请求数，默认为5
                //     maxInitialRequests: 一个入口最大的并行请求数，默认为3
                //     automaticNameDelimiter: 命名连接符
                //     name: 拆分出来块的名字，默认由块名和hash值自动生成
                //     cacheGroups: 缓存组。缓存组的属性除上面所有属性外，还有test, priority, reuseExistingChunk
                //     test: 用于控制哪些模块被这个缓存组匹配到
                //     priority: 缓存组打包的先后优先级
                //     reuseExistingChunk: 如果当前代码块包含的模块已经有了，就不在产生一个新的代码块
                //     配置项基本就上面这些，我们重点来看下chunks和cacheGroups。
                //     cacheGroups: 使用cacheGroups可以自定义配置打包块。
                chunks: 'all',
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        name: 'vendors'
                    }
                }
            }
        }
    };
}

module.exports = renderWebpack;
