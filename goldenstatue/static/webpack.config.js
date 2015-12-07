var webpack = require('webpack');

var webpackAlias = {}
/*{
    "babel-polyfill":"babel-polyfill/dist/polyfill.js",
    "react":"react/dist/react.js",
    "react-dom":"react-dom/dist/react-dom.js",
    "immutable":"immutable/dist/immutable.js",
    "react-router":"react-router/umd/ReactRouter.js"
};*/
var webpackNoParse = [];
for( var i in webpackAlias ){
    if (process.env.NODE_ENV === 'production'){
        var singleAlia = webpackAlias[i];
        var singleAliaMin = singleAlia.substr(0,singleAlia.length-3)+".min.js";
        webpackAlias[i] = singleAliaMin;
    }
    webpackNoParse.push(new RegExp(webpackAlias[i]));
}
var moduleConfig = {};
if (process.env.NODE_ENV === 'production'){
    var moduleConfig = {
        context:__dirname,
        entry: './src2/client.js',
        output: {
            path:__dirname+'/build2',
            publicPath: '/',
            filename: 'bundle.js'       
        },
        module:{
            loaders: [
                { test: /\.css$/, loader: "style!css" },
                { test: /Controller\.js$/, loader: "bundle?lazy" }
            ],
            noParse:webpackNoParse
        },
        resolve: {
            extensions: ['','.js'],
            alias:webpackAlias
        },
        plugins:[new webpack.optimize.UglifyJsPlugin()]
    }
}else{
    var moduleConfig = {
        context:__dirname,
        entry: './src/client.js',
        output: {
            path:__dirname,
            publicPath: '/',
            filename: 'bundle.js'       
        },
        module:{
            loaders: [
                { test: /\.js$/ , exclude:/node_modules/,loader:"babel?cacheDirectory"},
                { test: /\.css$/, loader: "style!css" },
                { test: /Controller\.js$/, loader: "bundle?lazy!babel?cacheDirectory" }
            ],
            noParse:webpackNoParse
        },
        resolve: {
            extensions: ['','.js'],
            alias:webpackAlias,
           
        },
        plugins:[new webpack.OldWatchingPlugin()]
    }
}
module.exports = moduleConfig;
