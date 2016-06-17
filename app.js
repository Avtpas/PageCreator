/**
 * Created by Administrator on 2016/6/6.
 */
var config = require("./webpack.config.js");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
delete config.entry["webpack-dev-server"];
config.devtool = "source-map";
//delete config.entry["webpack-hot"];
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    //hot:true
});


server.listen(80);