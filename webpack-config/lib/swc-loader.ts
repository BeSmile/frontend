import GetSwcOptions from '../../swcrc';

export default {
    test: /\.(ts|tsx)$/,
    exclude: /(node_modules)/,
    use: {
        // `.swcrc` can be used to configure swc
        loader: 'swc-loader',
        options: GetSwcOptions(true)
    }
};
