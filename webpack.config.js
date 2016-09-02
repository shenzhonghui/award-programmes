//webpack.config.js
var path = require('path');
module.exports = {
    //入口
    entry: path.join(__dirname, 'src', 'main.js'),
    //定义webpack输出的文件，我们在这里设置了 让打包后生成的文件放在dist文件夹下的build.js文件中
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: 'dist/',
        filename: 'build.js'
    },
    module: {
        //加载器
        loaders: [{
                test: /\.vue$/,
                loader: 'vue'
            },
            //转化ES6语法
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            //图片转化，小于8K自动转化为base64的编码
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=img/[name].[hash:8].[ext]'
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }, {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    //这里用于安装babel，如果在根目录下的.babelrc配置了，这里就不写了
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['', '.js', '.vue'],
    },

};
