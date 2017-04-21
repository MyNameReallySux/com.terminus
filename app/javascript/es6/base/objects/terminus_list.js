function TerminusList(object){
    if(typeof object == "array" || typeof object == "object"){
        for(var i = 0; i < object.length; i++){
            this[i] = _toTerminusElement(object[i]);
        }
    } else {
        this[0] = object;
    }
    
    this[Symbol.iterator] = function * (){
        return Object.entries(this)[Symbol.iterator]();
    }
}

TerminusList.prototype.addClass = function(className){
    for(let element of Object.values(this)){
        element.addClass(className);
    }
    return this;
};

module.exports = TerminusList;