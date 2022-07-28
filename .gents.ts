/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-19 13:59:20
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-06-08 11:13:22
 */
const path = require('path');

module.exports = {
    alias: {
        '@src': path.resolve(__dirname, '.', 'src'),
        '@layouts': path.resolve(__dirname, '.', 'src', 'layouts'),
        '@pages': path.resolve(__dirname, '.', 'src', 'pages'),
        '@components': path.resolve(__dirname, '.', 'src', 'components'),
        '@hooks': path.resolve(__dirname, '.', 'src', 'hooks'),
        '@services': path.resolve(__dirname, '.', 'src', 'services'),
        '@assets': path.resolve(__dirname, '.', 'src', 'assets'),
        '@atom': path.resolve(__dirname, '.', 'src', 'atom'),
        '@beans': path.resolve(__dirname, '.', 'src', 'beans'),
        '@utils': path.resolve(__dirname, '.', 'src', 'utils'),
        '@models': path.resolve(__dirname, '.', 'src', 'models'),
        '@public': path.resolve(__dirname, '.', 'public')
    },
    theme: {}
};
