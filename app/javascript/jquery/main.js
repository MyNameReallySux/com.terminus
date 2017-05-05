/* ##############################
    Node.js Packages
############################## */

var sass = require("../../sass/app.scss");
var scripts = require("./base/scripts");
var utils = require("./base/utils");

var $ = jQuery = require("jquery");
var fa = require("font-awesome-webpack");
var prism = require("prismjs");


/* ##############################
    Local Functions
############################## */

function initialize(config){
    if(scripts != undefined){
        for(func in scripts){
            config[func] = scripts[func]; 
        }
    }
    return config;
}

function initializeUtils(){
	var functions = {}
    if(utils != undefined){
        for(func in utils){
            functions[func] = utils[func]; 
        }
    }
	return functions;
}

function initializeComponents(){
	var files = {}
	files["accordian"] = require("./components/accordian");
	files["menu"] = require("./components/menu");
	files["panel"] = require("./components/panel");
	return files;
}

/* ##############################
    Module Export
############################## */

module.exports = window.Radiance = initialize({
	components: initializeComponents(),
	utils: initializeUtils()
})

