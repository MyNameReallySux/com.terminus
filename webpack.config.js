/* ########################
    Require Node.js Packages
######################## */

const webpack = require('webpack');
const pages = require("./app/routes/router.js");
const fs = require("fs");

/* ########################
    Require Plugins
######################## */

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin');

/* ########################
    Package Data
######################## */

let _src = "./app/javascript";
let _build = "./build";
let _public = "./public/";
let _pages = _src + "/pages";

function appendPageJavascript(pages, entry){
    function extractPageJavascript(pages, prepend){
        var filename;

        if(prepend == "" || typeof prepend != "string") prepend = "/";
        else prepend = "/" + prepend + "$";

        for(name in pages){
            filename = `${name}`;
            filepath = _pages + prepend + filename + ".js";

            entry[name] = filepath; 
            if("children" in pages[name]){
                extractPageJavascript(pages[name].children, filename);
            }
        }
    }
    
    // extractPageJavascript(pages);
    return entry;
}

function appendNodeJsModules(externals){    
    return externals;
    fs.readdirSync('node_modules').filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    }).forEach(function(mod) {
        externals[mod] = 'commonjs ' + mod;
    });
    return externals;
}

var commonConfig = {
    module: {
        loaders: [
			{ 
				test: /\.css$/,
				loader: 'style-loader!css?sourceMap',
				query: {
					name: `css/[name].[ext]`,
					mimetype: `text/css`,
					limit: 8192
				}
			}, {
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('css-loader?sourceMap!resolve-url-loader!sass-loader?sourceMap')
			}, {
				test: /\.(woff|woff2|ttf|eot)/,
				loader: "url-loader",
				query: {
					name: `fonts/[name].[ext]`,
					limit: 8192
				}
			}, { 
				test: /\.coffee$/,
				loader: 'coffee-loader',
			}, { 
				test: /\.js/,
				loader: 'babel-loader',
			}, {
			  	test: /\.(png|jpg|svg)$/,
				query: {
					name: `img/[name].[ext]`,
					mimetype: `mimetype=image/svg+xml`,
					limit: 8192
				},
			  	loader: "url-loader"
			}
        ]
    }
}

var jqueryDependentConfig = Object.assign({}, commonConfig, {
    name: "Radiance (jQuery dependent)",
    entry: appendPageJavascript(pages, {
        app: _src + "/jquery/main.js",
        vendor: ["jquery"],
    }),
    output: {
        path: _public,
		publicPath: _public,
        filename: "js/radiance.jquery.js",
        libraryTarget: "var",
        library: "App"
    },
	//devtool: "inline-source-map", 
	plugins: [
        new webpack.optimize.CommonsChunkPlugin({
			name: "vendor", 
			filename: "js/radiance.vendor.js"
		}),
        new ExtractTextPlugin({
			filename: 'css/app.css',
            allChunks: true

        }),
		new LiveReloadPlugin(),
		new webpack.LoaderOptionsPlugin({
			context: '/',
			debug: true
		 })
    ],
    externals: appendNodeJsModules({
        "$": "jquery"
    })
});
                                          
var independentES6Config = Object.assign({}, commonConfig, {
    name: "Radiance (ES6)",
    entry: appendPageJavascript(pages, {
        app: _src + "/es6/main.js"
    }),
    output: {
        path: _public,
		publicPath: _public,
        filename: "js/radiance.es6.js",
        libraryTarget: "var",
        library: "App"
    },
});

module.exports = [
    jqueryDependentConfig,
    independentES6Config
]

