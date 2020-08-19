const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack  = require('webpack')

module.exports = {
    mode: 'none', // production | development | none
    // mode: 'production', // 会进行压缩
    entry: {
        // 公用css文件
        common: path.resolve(__dirname,'./src/js/publicCss.js'),
        // 主页
        index: path.resolve(__dirname,'./src/js/index.js'),
        // 列表页
        list: path.resolve(__dirname,'./src/js/list.js')
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'js/[name].[hash:8].js',
        // publicPath:'http://localhost:9000/'
    },
    devServer: {
        // contentBase: path.join(__dirname, "dist"), //告诉服务器从哪里提供内容
        // compress: true, //启用gzip 压缩
        host: 'localhost',
        port: 9000,
        open: true
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
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            title:"首页",  //生成的html title名字，在模板文件中用  <title><%= htmlWebpackPlugin.options.title %></title>调用即可
            chunks:['common','index'],  //引入entry中的key名字的js文件，此处为login，打包后html后会自动引入login.js文件
            filename: 'index.html', // bulid目录下生成的html文件名
            template: './src/index.html' // 我们原来的index.html路径，作为模板
        }),
        new HtmlWebpackPlugin({
            title: '列表页',
            chunks:['common','list'],
            filename: 'list.html',
            template: './src/list.html'
        })
    ]
    // module: {
    //     rules: [
    //       { 
    //         test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, 
    //         use: [
    //           {
    //             loader: 'url-loader',
    //             options: {
    //               name: 'img/[name].[hash:8].[ext]', // 输出文件名称
    //               limit: 1024, // 小于limit则转为base64
    //               esModule: false, // 禁用esModule, 解决html中img标签的src不正确的问题
    //               publicPath: 'http://example.com/' // 项目线上的地址，这里建议用绝对地址，相对地址会在html文件目录结构复杂时出现图片路径问题, 本地开发为http://localhost:8080/
    //             }
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   optimization: {
    //     splitChunks: {
    //       chunks: 'all',
    //       cacheGroups: {
    //         common: {
    //           name: 'common',
    //           minChunks: 2,  //最少被2个chunk引用
    //         }
    //       }
    //     }
    //   },
    //   plugins: [
    //     new HtmlWebpackPlugin({
    //       chunks: ['index', 'common'],
    //       template: './src/index.html',
    //       filename: 'index.html'
    //     }),
    //     new HtmlWebpackPlugin({
    //       chunks: ['list', 'common'],
    //       template: './src/list.html',
    //       filename: 'list.html'
    //     }),
    //     // new CopyWebpackPlugin([
    //     //   {
    //     //     from: path.join(__dirname, './src/js'),
    //     //     to: path.join(__dirname, './dist/js')
    //     //   },
    //     //   {
    //     //     from: path.join(__dirname, './src/css'),
    //     //     to: path.join(__dirname, './dist/css')
    //     //   }
    //     // ]),
    //     new CopyWebpackPlugin({
    //         patterns: [
    //             {
    //                 from: path.join(__dirname, './src/js'),
    //                 to: path.join(__dirname, './dist/js')
    //             },
    //             {
    //                 from: path.join(__dirname, './src/css'),
    //                 to: path.join(__dirname, './dist/css')
    //             }
    //         ]
    //     }),
    //     new ExtractTextPlugin("build/[name].[hash:8].css")
    //   ]
}