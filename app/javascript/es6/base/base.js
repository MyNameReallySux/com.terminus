TerminusElement = require("./objects/terminus_element");
TerminusElement = require("./objects/terminus_list");

function _getNodeType(value){
    if(_isNode(value)) value = value.nodeType;
    if(typeof value == "number"){
        if(value == 1){
            return "element";
        } else if(value == 3){
            return "text";
        } else if(value == 7){
            return "processing instruction";
        } else if(value == 8){
            return "comment";
        } else if(value == 9){
            return "document";
        } else if(value == 10){
            return "document type";
        } else if(value == 11){
            return "document fragment";
        }
    }
}

function _isElement(o){
    return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
}

function _isNode(o){
  return (
    typeof Node === "object" ? o instanceof Node : 
    o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
  );
}

function _toTerminusElement(object){
    return new TerminusElement(object);
}

function _toTerminusList(object){
    return new TerminusList(object);
}

module.exports = {
    find: function(selector){
        var parts = selector.split(" ");
        if(parts.length == 1){
            if(parts[0].charAt(0) == "#");
            return Terminus.findById(parts[0].substr(1));
        }
    },
    findById: function(id){
        var result = document.getElementById(id);
        return _toTerminusElement(result);
    },
    findByClass: function(cssClass){
        var result = document.querySelectorAll("."+cssClass);
        return _toTerminusList(result);
    },
}
