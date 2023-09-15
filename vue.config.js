const { defineConfig } = require('@vue/cli-service')
    // const path = require('path')
module.exports = defineConfig({
    lintOnSave: false,
    productionSourceMap:false,
    transpileDependencies: true,

    devServer: {
        open: true,
        host: '127.0.0.1',
        https: false,
        hot: 'only',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn',
            },
        },
    },
})