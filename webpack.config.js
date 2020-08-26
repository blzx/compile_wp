const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const webpack  = require('webpack')

const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

module.exports = {
    mode: 'development', // production | development | none
    // mode: 'production', // 会进行压缩

    // 控制是否生成以及如何生成 source-map 
    // devtool: 'none', // 省略devtool选项 不生成source map 代码报错后会指向打包后的目录
    // devtool: 'eval', // 每个模块使用eval()执行 错误代码会映射到编译后的代码
    // devtool: 'evalsource-map', // 每个模块使用eval()执行 错误代码会映射到源代码
    // devtool: 'hidden-source-map',
    // devtool: 'nosource-source-map',
    devtool: 'source-map',
    entry: {
        // 公用css文件
        common: path.resolve(__dirname,'./src/js/publicCss.js'),
        // 第三方库
        // vendor: path.resolve(__dirname, './src/js/jquery.min.js'),
        // module1
        module1: path.resolve(__dirname,'./src/view/module1/index.js'),
        // module2
        module2: path.resolve(__dirname,'./src/view/module2/index.js'),
        // module3
        module3: path.resolve(__dirname,'./src/view/module3/index.js'),
    },
    output: {
        // 输出文件的目标路径 dist文件夹 (绝对路径)
        // __dirname:当前文件在硬盘中（绝对路径）的目录
        path: path.resolve(__dirname,'./dist'),
        // name: 使用入口文件名 但是每次都会重新生成一个文件，文件数量越来越多
        // filename: 'js/[name].[hash:8].js',
        // 使用内部chunkhash值，但是每次都会重新生成一个文件，文件数量越来越多
        // filename: 'js/[chunkhash].js'
        filename: 'js/[name].js',
        // 规定服务器开始解析的目录
        // 通过 webpack-dev-server 服务启动后资源的加载路径为 http://localhost:9000/xxx.js / http://localhost:9000/xxx.png
        // publicPath: '/'
    },
    // watch: 在 package.json 中加入watch命令，实时监听，重新打包
    // 但浏览器不能实时重新加载，需要手动刷新，可以使用DevServer

    devServer: { // 一个简单的web server 可以实时重新加载
        // 默认去根目录下寻找index（打包后的,就是配置中的 filename:index.html，默认将打包文件放到根目录下）
        // 如果没有使用index.html文件名 则需要通过contentBase指定打包目录
        contentBase: path.join(__dirname,'dist'),
        // contentBase: path.join(__dirname,'src'),
        compress: true, //启用gzip 压缩
        host: 'localhost',
        port: 9000,
        open: true,
        
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader","css-loader"]
            },
            {
                test: /\.jpg$/,
                use: ['file-loader']
            },
            {
                test: /\.png$/,
                use: ['url-loader?mimetype=image/png']
            },
            // 处理 html 文件图片
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: {
                        list: [
                            {
                                tag: 'img',
                                attribute: 'src',
                                type: 'src'
                            },
                            {
                                tag: 'img',
                                attribute: 'data-src',
                                type: 'src'
                            }
                        ],
                        root: path.resolve(__dirname, './dist'),
                    }
                }
                
            },
        ]
    },
    plugins: [
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery'
        // }),

        // 已废弃 使用splitChunks代替
        // new webpack.optimize.CommonsChunkPlugin({}),

        // 使用devserver启动时会清空dist目录；
        // 如果使用了CleanWebpackPlugin，不要将devserver的contentBase指向dist
        // new CleanWebpackPlugin(),
        // new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),

        // 生成多个HTML文件，则多次声明
        new HtmlWebpackPlugin({
            title:"module1",  //生成的html title名字，在模板文件中用  <title><%= htmlWebpackPlugin.options.title %></title>调用即可
            chunks:['common','module1'],  //引入entry中的key名字的js文件，此处为login，打包后html后会自动引入login.js文件
            filename: 'module1.html', // bulid目录下生成的html文件名
            template: './src/module1.html', // 我们原来的index.html路径，作为模板
            inject:true,
            hash: true,
        }),
        new HtmlWebpackPlugin({
            title: 'module2',
            chunks:['common','module2'],
            filename: 'module2.html',
            template: './src/module2.html',
            inject: true,
            hash: true,
        }),
        new HtmlWebpackPlugin({
            title: 'module3',
            chunks:['common','module3'],
            filename: 'module3.html',
            template: './src/module3.html',
            inject: true,
            hash: true,
        })
    ],
    optimization: {
        splitChunks: {
            // 第三方依赖的拆分规则 有三个值： async initial all
            // async 从异步加载的模块里拆分第三方依赖
            // initial 从入口文件中拆分
            // all 以上所有(默认)
            chunks: 'all',
            
            cacheGroups: {
                // 拆分范围由test规定；默认只拆分从node_modules文件夹下引入的模块（key值可修改）
                defaultVendors: {
                    // 默认只拆分从node_modules文件夹下引入的模块
                    // test: /[\\/]node_modules[\\/]/,
                    // 拆分从js文件夹中导入的jquery.min.js文件
                    // test: /[\\/]js[\\/](jquery.min.js)/,
                    test: /[\\/](node_modules|js)[\\/]/,
                    // 权重 
                    priority: -10
                },
                // 如果执行完defaultVendors后，还有符合default条件的模块需要拆分，则继续执行default。
                // 拆分范围默认所有
                // minChunks 根据导入模块的数量决定是否进行拆分
                // key值可修改
                default: {
                    // 只要导入了其他模块就进行拆分(>=1)
                    // minChunks: 1,
                    minChunks: 2, // 导入两个或两个以上是拆分
                    // 权重 -20小于上面的-10 优先走 defaultVendors
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
}