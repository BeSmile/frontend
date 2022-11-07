const path = require('path');
const rules = require('./lib/rule.js');
const getPlugins = require('./lib/plugins');
const proxy = require('./lib/proxy');
const minimist = require('minimist');
// var child_process = require("child_process");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

let config = {};

if (process.env.NODE_MODE !== 'plugin') {
    config = require('../.gents.ts');
}
const args = minimist(process.argv.slice(2), {
    // boolean: [
    //     'help',
    //     'playground'
    // ],
    string: [
        'env',
        'port',
        'host'
        // 'extensionPath',
        // 'browser',
        // 'browserType'
    ]
});

// fs.watch(modelPath, function (event, filename) {
//   if(event === "rename") {
//     clearTimeout(tm2);
//     tm2 = setTimeout(function() {
//       // When NodeJS exits
//       process.on("exit", function () {
//         require("child_process").spawn(process.argv.shift(), process.argv, {
//             cwd: process.cwd(),
//             detached : true,
//             stdio: "inherit"
//         });
//       });
//       process.exit();
//     }, 1000);
//   }
// });

// 生成webpack文件
async function renderWebpack() {
    // var webpack = require("webpack");
    const plugins = await getPlugins();

    return {
        stats: 'none', // 错误提示
        mode: 'development',
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            alias: config.alias
        },

        entry: {
            app: path.resolve(__dirname, '..', 'src', 'index.tsx')
        },
        output: {
            path: path.resolve(__dirname, '.', 'dist'), // 输出的路径
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
                // "no-console-loader": path.resolve(__dirname, "loaders/no-console.ts")
            }
        },
        devtool: 'eval-source-map',
        module: {
            rules: rules
        },
        target: 'web',
        plugins: plugins,
        devServer: {
            host: args.host,
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
            proxy: proxy[args.env]
        },
        externals: {
            'markdown-it': 'markdownIt',
            './cptable': 'var cptable',
            '../xlsx.js': 'var _XLSX'
        }
    };
}

module.exports = renderWebpack;
