/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2022-01-03 16:03:04
 * @LastEditors: BeSmile
 * @LastEditTime: 2022-01-03 16:09:46
 */
module.exports = {
    dev: {
        '/blog': {
            target: '',
            changeOrigin: true,
            pathRewrite: { '^': '' }
        },
        '/api/docker': {
            target: 'http://127.0.0.1:8080',
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
        }
    }
};
