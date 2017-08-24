var path = require('path')
var webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const ImageminPlugin = require('imagemin-webpack-plugin').default;
const htmlPluginList = require('./build/genhtml')();

const packageJson = require('./package.json');
const OSS_DIR = `/app/${packageJson.name}/`

const STATIC_PATH = (process.env.DIST_ENV !== 'product'
        ? 'http://static.qa.xingbianli.cn'
        : 'https://s.xingbianli.cn') + OSS_DIR;

module.exports = {
    entry: {
        'commodity-list': './src/pages/commodity-list',
        'commodity-edit': './src/pages/commodity-edit',
        'commodity-view': './src/pages/commodity-view',
        'common': ['vue']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: (process.env.NODE_ENV === 'development') ? '/dist/' : '../dist/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        less: ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: ['css-loader', 'less-loader'],
                            publicPath: STATIC_PATH
                        })
                    },
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                },
                // exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader'],
                    publicPath: STATIC_PATH
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader'],
                    publicPath: STATIC_PATH
                })
            },
            {
                test: /\.woff|ttf|woff2|eot$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|svgz)(\?.+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 2000
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@less': path.join(__dirname, 'src/less'),
            '@lib': path.join(__dirname, 'src/lib'),
            '@components': path.join(__dirname, 'src/components'),
            '@modules': path.join(__dirname, 'src/modules')
        }
    },
    devServer: {
        contentBase: path.join(__dirname, './html'),
        port: 6666,
        host: '0.0.0.0',
        disableHostCheck: true,

    },
    performance: {
        hints: false
    },
    devtool: '#cheap-source-map',
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common', 'manifest'],
            minChunks: Infinity
        }),
        new ExtractTextPlugin('[name].css'),
        // ...htmlPluginList
    ]
}

if (process.env.DIST_ENV === 'product') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
