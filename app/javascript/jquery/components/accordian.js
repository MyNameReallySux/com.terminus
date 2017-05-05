var $, Utils, accordian, isValidQuery, isValidString, initInstance, initOptions;

$ = require('jquery');
Utils = require('../base/utils');

isValidQuery = Utils.isValidQuery;
isValidString = Utils.isValidString;
initInstance = Utils.initInstance;
initOptions = Utils.initOptions;

accordian = function(selector, options){
	/* ##############################
		Private Data
	############################## */

	var _click_on_type, _generateIcon, _initAccordian, _initAccordianContent, _initAccordianLink, _onAccordianLinkClick, defaults, instance;
	
	instance = "";
	
	defaults = {
		// Selectors
		selector: '.accordian',
		selector_link: '.accordian-link',
		selector_content: '.accordian-content',
		// Classes
		open_class: 'open',
		close_class: '',
		icon_class: "fa fa-chevron-down",
		// Events
		click_on: "link"
	};
	
	options = {};
	
	_click_on_type = {
		link: "link",
		icon: "icon"
	};

   /* ##############################
        Global Functions
		
		- These depend on the "Radiance" object being set.
    ############################## */
	
	Radiance.closeAccordian = function($accordian){
		if(!$accordian){
			$(options.selector).removeClass(options.open_class);
		} else {
			$accordian.removeClass(options.open_class);
			$accordian.find(options.selector).removeClass(options.open_class);
		}
	};
	Radiance.openAccordian = function($accordian){
		var $parent;
		/* ============================== */
		$parent = $accordian.parent();
		if($parent.is('ul')){
			Radiance.closeAccordian($parent);
		} else {
			Radiance.closeAccordian($accordian.siblings());
		}
		$accordian.parents('.accordian').addClass(options.open_class);
		$accordian.addClass(options.open_class);
	};
	Radiance.toggleAccordian = function($accordian){
		var open;
		/* ============================== */
		open = $accordian.hasClass('open');
		if(open){
			Radiance.closeAccordian($accordian);
		} else {
			Radiance.openAccordian($accordian);
		}
	};

 	/* ##############################
        Private Functions
    ############################## */
	
	_generateIcon = function(){
    	var $i;
		/* ============================== */
    	$i = $(document.createElement('i'));
    	$i.addClass(options.icon_class);
    	return $i;
  	};
	_initAccordian = function($accordian){
		console.log($accordian);
		_initAccordianLink($accordian);
		_initAccordianContent($accordian);
  	};
  	_initAccordianLink = function($accordian){
    	var getAccordianSource, getAnchorLink, getClassLink, getDataLink, getIconBasedSource, getIconLink, getLinkBasedSource, source;
		/* ============================== */
    	getDataLink = function($element){
      		return $element.find("*[data-accordian='open']");
		};
		getIconLink = function($element){
    		return $element.children("i");
    	};
    	getClassLink = function($element){
			return $element.find(options.selector_link);
    	};
    	getAnchorLink = function($element){
      		var $children;
		  	if($element.hasClass(options.selector_link && $element.is("a"))){
				return $element;
		  	} else {
				$children = $element.find("a");
				if(!isValidQuery($children)){
					$children = $element.children("*").children("a");
				}
				return $children;
		  	}
    	};
		getAccordianSource = function($element){
		  	if(options.click_on === _click_on_type.link){
				return getLinkBasedSource($element);
		  	} else if(options.click_on === _click_on_type.icon){
				return getIconBasedSource($element);
		  	}
		};
    	getLinkBasedSource = function($element){
      		var $anchorLink, $classLink, $dataLink;
      		$dataLink = getDataLink($element);
      		$classLink = getClassLink($element);
      		$anchorLink = getAnchorLink($element);
      		if(isValidQuery($dataLink)){
        		return $dataLink;
      		} else if(isValidQuery($classLink)){
        		return $classLink;
      		} else if(isValidQuery($anchorLink)){
        		return $anchorLink;
      		} else {
        		return getIconBasedSource($element);
      		}
    	};
    	getIconBasedSource = function($element){
      		var $anchorLink, $classLink, $i, $icon;
      		$classLink = getClassLink($element);
      		$anchorLink = getAnchorLink($classLink);
      		if(isValidQuery($classLink)){
        		$icon = getIconLink();
        		if(!isValidQuery($icon)){
					$icon = _generateIcon;
					if(isValidQuery($anchorLink)){
						return $anchorLink.append($icon);
					} else {
						return $classLink.append($icon);
					}
				} else {
					return $icon;
				}
      		} else {
				$i = _generateIcon();
				$accordian.prepend($i);
				return $i;
			}
		};
		/* ============================== */
    	source = getAccordianSource($accordian);
    	return source.on("click", _onAccordianLinkClick);
  	};
  	_initAccordianContent = function($accordian){
    	var $content;
		/* ============================== */
    	$content = $accordian.children(options.selector_content);
  	};
  	_onAccordianLinkClick = function(e){
		var $parent, $source;
		/* ============================== */
		$source = $(this);
		$parent = $source.parents(options.selector);
		Radiance.toggleAccordian($parent);
		e.stopPropagation;
		e.preventDefault;
		return false;
  	};
	
	/* ##############################
        Public Functions
    ############################## */
	
  	this.onCreate = function(){
    	var $accordians, result;
		/* ============================== */
		result = initInstance(selector, options, defaults);
    	instance = result.instance;
		options = result.options;
    	$accordians = instance;
    	return $accordians.each(function(i, accordian){
      		return _initAccordian($(this));
    	});
  	};
  	this.open = (function(){
    	Radiance.openAccordian(this.element);
  	}).bind(this);
  	this.close = (function(){
    	Radiance.closeAccordian(this.element);
  	}).bind(this);

  	/* ##############################
        Procedure
    ############################## */
	
  	this.onCreate();

  	/* ##############################
        Return Object
    ############################## */
    
    return this;
};

accordian.bind(accordian);
module.exports = accordian;