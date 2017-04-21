/* ##############################
    Node.js Packages
############################## */

var $ = jQuery = require("jquery");

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
    return config;
}

function loadDirectory(directory){
    var files = {}
    if(__webpack_modules__[require.resolveWeak(directory+"/_manifest.js")]) {
      var _dir = require(directory+"/_manifest.js");
        for(name in _dir){
            var file = _dir[name];
            if(file.use){
                files[name] = require(directory+"/"+file.name);
            }
        }           
    }     
    return files;
}

/* ##############################
    Module Export
############################## */

module.exports = window.Terminus = initialize({
    "components": loadDirectory("./components")
});
