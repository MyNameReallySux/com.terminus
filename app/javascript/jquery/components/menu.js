var $, Utils, menu, isValidQuery, isValidString, initInstance;

$ = require('jquery');
Utils = require('../base/utils');

isValidQuery = Utils.isValidQuery;
isValidString = Utils.isValidString;
initInstance = Utils.initInstance;
initOptions = Utils.initOptions;

menu = function(selector, options){
	/* ##############################
		Private Data
	############################## */

	var _privateFunctions, defaults, instance;
	
	instance = "";
	
	defaults = {
		// Selectors
		selector: ".menu, *[class$='-menu']"
		// Classes
		
		// Events
	};
	
	options = {};

   /* ##############################
        Global Functions
		
		- These depend on the "Radiance" object being set.
    ############################## */
	
	Radiance.globalFunction = function($menu){
		var data;
		/* ============================== */
		return data = false;
	};

 	/* ##############################
        Private Functions
    ############################## */
	
	_initMenu = function($menu){
		var $root, level;
		
    	if($menu.is("ul")) $root = $menu;
		else $root = $menu.children("ul");
		
		level = 0;
		_initMenuLevel($root, level)
  	};
	
	_initMenuLevel = function($root, level){
		var count;
		count = 1;
		
		if(!isValidQuery($root)) return;
		if(level == 0) $root.addClass("root");
		else 			$root.addClass("level-" + level);
		$root.attr("data-level", level);
		
		
		
		$root.children("li").each(function(){
			$item = $(this);
			$item.addClass("item-" + count);
			$item.attr("data-item", count);

			$submenu = $item.children("ul");
			if(isValidQuery($submenu)){
				if(level > 0) $root.addClass("has-children");
				$root.attr("data-children", $submenu.length);
				
				level++;
				_initMenuLevel($submenu, level)
			}
			
			count++;
		});
	}
	
	/* ##############################
        Public Functions
    ############################## */
	
  	this.onCreate = function(){
    	var $menus, result;
		/* ============================== */
		result = initInstance(selector, options, defaults);
    	instance = result.instance;
		options = result.options;
    	$menus = instance;
    	return $menus.each(function(i, accordian){
      		return _initMenu($(this));
    	});
  	};
  	this.publicFunction = (function(){
		var data;
		/* ============================== */
    	console.log("Public Function")
		return data = false;
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

menu.bind(menu);
module.exports = menu;