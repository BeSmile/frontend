module.exports = {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                plugins: [
                    'react-hot-loader/babel',
                    [
                        '@babel/plugin-transform-runtime',
                        {
                            absoluteRuntime: false,
                            corejs: false,
                            helpers: true,
                            regenerator: true,
                            useESModules: false
                        }
                    ],
                    [
                        'import',
                        {
                            libraryName: 'antd',
                            libraryDirectory: 'es',
                            style: 'css'
                        }
                    ]
                ],
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
        }, // 开启热加载
        {
            loader: 'ts-loader',
            options: {
                transpileOnly: true // ? 关闭类型检查，即只进行转译
            }
        }
    ]
};
