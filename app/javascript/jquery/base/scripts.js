var $, Utils, menu, hasAttr, isValidQuery, isValidString, initInstance;

$ = require('jquery');
Utils = require('../base/utils');

hasAttr = Utils.hasAttr;
isValidQuery = Utils.isValidQuery;
isValidString = Utils.isValidString;
initInstance = Utils.initInstance;
initOptions = Utils.initOptions;

/* ##############################
	App Data
############################## */

var stickys, stickyCount;

/* ##############################
	App Functions
############################## */

function initStickys(){
	var $element, marker, id;
	
	stickyCount = 1;
	stickys = $("*[data-sticky]");
	
	stickys.each(function(){
		$element = $(this);
		id = $element.attr("id") || "Sticky";
		if(id == "Sticky") {
			id += stickyCount++;
			$element.attr("id", id);
		}
		
		marker = $(document.createElement("div"))
		marker.attr("data-for", id);
		
		$element.before(marker);
	})
}

function checkStickys(){
	var scrollTop, $element, id, $marker, markerPos, offset;
	
	scrollTop = $(window).scrollTop();
	
	stickys.each(function(){
		$element = $(this);
		id = $element.attr("id");
		$marker = $("*[data-for='" + id + "']")
		
		markerPos = $marker.offset().top;
		offset = +$element.attr("data-offset") || 0;
						
		if(!$element.hasClass("fixed") && (markerPos + offset) <= scrollTop){
			$element.addClass("fixed");
		} else if($element.hasClass("fixed") && (markerPos + offset) > scrollTop) {
			$element.removeClass("fixed");
		}
	});
}

function initOpenables(){
	var element, source, id, target, openSelf, hasTarget;
	
	$("*[data-open], *[data-open-self]").each(function(){
		$(this).on("click", function(e){
			source = $(this);
			openSelf = hasAttr(source, "data-open-self");
			id = "#" + source.attr("data-open");
			target = $(id);
			hasTarget = isValidQuery(target);
			
			if(openSelf && hasTarget){
				target.toggleClass("open");
				target.hasClass("open") ? source.addClass("open") : source.removeClass("open");
			} else if (hasTarget){
				target.toggleClass("open");
			} else if (openSelf){
				source.toggleClass("open");
			}
			
			e.preventDefault();
			e.stopPropagation();
		});
	});
	
	$(document).on("click", function(){
		$("*[data-open], *[data-open-self]").each(function(){
			source = $(this);
			id = "#" + source.attr("data-open");
			target = $(id);
			source.removeClass("open");
			target.removeClass("open");
		})
	});
}

/* ##############################
	Procedure
############################## */

$(document).ready(function(){
	App.components.accordian();
	App.components.menu();
	
	initOpenables();
	initStickys();
	
	Prism.highlightAll();

});
				 
var timeout;
$(window).scroll(function(){
	checkStickys();
})