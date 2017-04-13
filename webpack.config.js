var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
//var HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
	entry: {
		"webpack-dev-server":"webpack-dev-server/client?http://localhost:8999",
		//"webpack-hot":"webpack/hot/dev-server",
		"index":'./src/index.js',
		"view":'./src/view.js',
		"polyfill":'./src/polyfill.js'
		,"test":'./src/test.js'
	},
	output: {
	    path: __dirname+'/dist/',
		publicPath:'../dist/',
	    //filename: '[name].[chunkhash:8].js'//发布时打开
		filename: '[name].js'
	},
	resolve: {
	    extensions: ['', '.js', '.jsx','.css','.coffee','.es6']
	},
 	module: {
        loaders: [
        	 {test: /(\.jsx|\.js|\.es6)$/, loader: "babel",query: {
		        presets: ['es2015']
		     }}
			,{ test: /\.css$/, loader: ExtractTextPlugin.extract("css-loader?root=..")}
			,{ test: /\.coffee/, loader: 'coffee-loader'}
			,{test: /.(png|jpg)$/, loader: 'url-loader?limit=9000&name=/image/[name].[ext]'}
			,{ test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'url-loader?importLoaders=1&limit=1000&name=fonts/[name].[ext]' }
        ]
    },
    plugins: [
    	//new ExtractTextPlugin("style.[contenthash:9].css"),//发布时打开
		new ExtractTextPlugin("style.css")
		//,new HtmlWebpackPlugin({
		//	template:"./app/index.html"
		//	//path:__dirname+'/dist/'
		//})
		//,new webpack.HotModuleReplacementPlugin()
	]
};