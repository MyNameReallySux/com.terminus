function TerminusElement(object){
    this._ = object;
    this.type = object.nodeName.toLowerCase();
    this.nodeType = _getNodeType(object).toLowerCase();
}

TerminusElement.prototype.addClass = function(className){
    if(typeof className == "string"){
        var temp = this._.className.split(" ");
        temp.push(className);
        this._.className = temp.join(" ");
    }
    return this;
}

module.exports = TerminusElement;