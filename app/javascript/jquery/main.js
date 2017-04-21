/* ##############################
    Node.js Packages
############################## */

var $ = jQuery = require("jquery");
var fa = require("font-awesome-webpack");
var sass = require("../../sass/app.scss");
var prism = require("prismjs");

/* ##############################
    Local Functions
############################## */

function initialize(config){
    var base = require("./base/base");
    if(base != undefined){
        for(func in base){
            config[func] = base[func]; 
        }
    }
	var scripts = require("./base/scripts");
    if(scripts != undefined){
        for(func in scripts){
            config[func] = scripts[func]; 
        }
    }
    return config;
}

function initializeComponents(){
	var files = {}
	files["accordian"] = require("./components/accordian.coffee");
	files["panel"] = require("./components/panel");
	return files;
}

/* ##############################
    Module Export
############################## */

module.exports = window.Terminus = initialize({
	"components": initializeComponents()
})

