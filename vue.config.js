const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir)
}
let pages = {
    login: {
        entry: './src/pages/login/login.js',
        template: 'public/login.html',
        filename: 'login.html',
        title: 'login'
    },
    main: {
        entry: './src/pages/main/main.js',
        template: 'public/main.html',
        filename: 'main.html',
        title: 'main'
    },
    index: {
        entry: './src/index.js',
        template: 'public/index.html',
        filename: 'index.html',
        title: 'main'
    },
}
module.exports = {
    // 应用的架设路径，CLI默认你的项目部署在域名的根目录下所以publicPath默认为/
    publicPath: './',
    // 构建后的文件是否启用哈希命名
    filenameHashing: true,
    //关闭eslint
    lintOnSave: false,
    // 是否在save文件时lint代码, 需要先安装cli-plugin-eslint
    // lintOnSave: process.env.NODE_ENV !== 'production',
    productionSourceMap: process.env.NODE_ENV !== 'production',
    pluginOptions: { // 第三方插件配置
            'style-resources-loader': {
                preProcessor: 'less',
                patterns: [path.resolve(__dirname, './src/assets/css/base.less')] // less所在文件路径
            }
    },
    chainWebpack: config => {
        // config.plugins.delete('prefetch-admin')
        config.resolve.alias
            .set("@", resolve("src"))
            .set("main", resolve("src/pages/main"))
            .set("login", resolve("src/pages/login"))
            .set('assets',resolve('src/assets'))
    },
    pages: pages,
}