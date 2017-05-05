this.isValidQuery = function(query){
	return query && query.length > 0 && query !== void 0;
};

this.isValidString = function(str){
	return str === '' || typeof str !== 'string';
};

this.isFunction = function(func) {
	return func && {}.toString.call(func) === '[object Function]';
}

this.isValidAttr = function(attr){
	return typeof attr !== typeof undefined && attr !== false;
}

this.hasAttr = function($element, attr){
	return this.isValidAttr($element.attr(attr));
}.bind(this);

this.initInstance = function(selector, options, defaults, onError){
	var instance = $(selector);
	if(!this.isValidQuery(instance)){
		selector = defaults.selector;
		instance = $(selector);
	}
	if(this.isValidQuery(instance)){
		options = this.initOptions(selector, options, defaults);
	} else {
		if(this.isFunction(onError)) onError();	
	}
	return {
		instance, options
	};
}.bind(this);

this.initOptions = function(selector, options, defaults){
	if(options === 'undefined'){
		options = {};
	}
	options = $.extend({}, defaults, options);
	if(this.isValidString(selector)){
		options.selector = selector;
	} else {
		options.selector = defaults.selector;
	}
	return options;
}

module.exports = this;