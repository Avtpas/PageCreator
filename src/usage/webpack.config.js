var ExtractTextPlugin = require("extract-text-webpack-plugin");
//var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require('webpack')
var PathChunkPlugin = require('path-chunk-webpack-plugin');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js')
//plugins.push(new ExtractTextPlugin("style.css"));

//plugins.concat(CustomModuleChunks);

module.exports = {
    entry: {
        "bundle": './src/entry.js'
        ,"k8ms":'./src/entries/k8-ms/index.js'
        //,"patch":'./src/patch'
    },
    output: {
        path: __dirname + '/dist/',
        publicPath: '../dist/',
        //filename: '[name].[chunkhash:8].js'//发布时打开
        filename: '[name].js',
        chunkFilename: '/chunks/[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.coffee']
    },
    module: {
        loaders: [
            {
                test: /(\.jsx|\.js)$/, loader: "babel", query: {
                presets: ['es2015']
            }
            }
            , {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader?root=..")}
            //, {test: /\.css$/, loader: "css-loader?root=.."}
            , {test: /\.coffee/, loader: 'coffee-loader'}
            , {test: /.(png|jpg)$/, loader: 'url-loader?limit=9000&name=/image/[name].[ext]'}
            , {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: 'url-loader?importLoaders=1&limit=1000&name=fonts/[name].[ext]'
            }
        ]
    },
    plugins: [

        //new PathChunkPlugin({
        //    name: 'components',
        //    test: "src\\dependencies\\components"
        //})
        //,new PathChunkPlugin({
        //    name: 'custom_modules',
        //    test: "src\\custom_modules\\"
        //})

        //commonsPlugin,
        new ExtractTextPlugin("main.css")
    ]
};