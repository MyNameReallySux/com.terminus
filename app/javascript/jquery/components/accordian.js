var $ = require("jquery");

var accordian = function(selector, options){
    /* ##############################
        Private Data
    ############################## */
    
    var defaults = {
		// Selectors
        selector: ".accordian",
		selector_link: ".accordian-link",
		selector_content: ".accordian-content",
		// Classes
		open_class: "open",
		close_class: "",
    }
    
    var link = ".accordian-link";
    var content = ".accordian-content";
    
    /* ##############################
        Global Functions
    ############################## */
    
    Terminus.closeAccordian = function($accordian){
        if(!$accordian) {
            $(".accordian").removeClass("open");
        } else {
            $accordian.removeClass("open");
            $accordian.find(".accordian").removeClass("open");
        }
    }
    
    Terminus.openAccordian = function($accordian){
        $parent = $accordian.parent();
        if($parent.is("ul")){
            Terminus.closeAccordian($parent);
        } else {
            Terminus.closeAccordian($accordian.siblings());
        }
        $accordian.parents(".accordian").addClass("open");
        $accordian.addClass("open"); 
    }
    
    Terminus.toggleAccordian = function($accordian){
        var open = $accordian.hasClass("open");
        open ? Terminus.closeAccordian($accordian) : Terminus.openAccordian($accordian); 
    }
            
    /* ##############################
        Private Functions
    ############################## */
    
    function _initializeAccordian($accordian){
        _initializeAccordianLink($accordian);
        _initializeAccordianContent($accordian);
    }
    
    function _initializeAccordianLink($accordian){
        var $link = $accordian.children(".accordian-link");
        var $a = $link.children("a");
        var $i = _generateToggleIcon();
        $a.append($i);
    }
    
    function _initializeAccordianContent($accordian){
        var $content = $accordian.children(".accordian-content");

    }
    
    function _generateToggleIcon(){
        var $i = $(document.createElement("i"));
        $i.addClass("fa fa-chevron-down");
        $i.on("click", _onToggleIconClick)
        return $i;
    }
    
    function _onToggleIconClick(e){
        $source = $(this);
        $parent = $source.parents(".accordian");
        Terminus.toggleAccordian($parent);
        
        e.stopPropagation();
        e.preventDefault();
        return false;
    }
	
	/* ##############################
        Public Data
    ############################## */
	
	this.selector = selector;
	this.element = $(selector);
    
    /* ##############################
        Public Functions
    ############################## */
    
    this.onCreate = function(){
        if(options == "undefined") options = {};
        if(selector == "" || typeof selector != "string")
            selector = defaults.selector;
        $.extend(defaults, options);
        
        var $accordians = $(selector);
        $accordians.each(function(i, accordian){
            _initializeAccordian($(accordian));
        });
    }
	
	this.open = function(){
		Terminus.openAccordian(this.element)
	}.bind(this);
	
	this.close = function(){
		Terminus.closeAccordian(this.element)
	}.bind(this);
    
    /* ##############################
        Procedure
    ############################## */
    
    this.onCreate();
    
    /* ##############################
        Export Object
    ############################## */
    
    return this;
}
accordian.bind(accordian);
module.exports = accordian;
