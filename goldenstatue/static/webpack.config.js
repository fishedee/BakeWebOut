var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');

if (process.env.NODE_ENV === 'production'){
    var plugins = [
        new webpack.optimize.UglifyJsPlugin(),
        new AssetsPlugin({path:__dirname+"/build2"}),
        new webpack.DefinePlugin({
          "process.env": {
            NODE_ENV: JSON.stringify("production")
          }
        })
    ];
    var outputpath = __dirname+"/build2";
}else{
    var plugins = [
        new AssetsPlugin({path:__dirname+"/build"}),
        new webpack.OldWatchingPlugin()
    ];
    var outputpath = __dirname+"/build";
}
module.exports = {
    context:__dirname,
    entry: './src2/client.js',
    output: {
        path:outputpath,
        publicPath: '/',
        filename: 'bundle-[hash].js'    
    },
    module:{
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            //{ test: /Controller[0-9]*\.js$/, loader: "bundle?lazy" }
        ]
    },
    resolve: {
        extensions: ['','.js']
    },
    plugins:plugins
};