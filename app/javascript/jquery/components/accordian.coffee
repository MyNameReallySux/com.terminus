$ = require('jquery')

accordian = (selector, options) ->
	### ************************
		Initialize Data
	************************ ### 
	
	instance = ""

	defaults = 
		selector: '.accordian'
		selector_link: '.accordian-link'
		selector_content: '.accordian-content'
		open_class: 'open'
		close_class: ''
		
		click_on: "link"
		icon_class: "fa fa-chevron-down"
		
	options = {}
	
	_click_on_type =
		link: "link"
		icon: "icon"

	### ************************
		Global Functions
		
		- These depend on the "Terminus" object being set.
	************************ ###  

	Terminus.closeAccordian = ($accordian) ->
		if !$accordian
		  $(options.selector).removeClass options.open_class
		else
		  $accordian.removeClass options.open_class
		  $accordian.find(options.selector).removeClass options.open_class
		return

	Terminus.openAccordian = ($accordian) ->
		$parent = $accordian.parent()
		if $parent.is('ul')
		  Terminus.closeAccordian $parent
		else
		  Terminus.closeAccordian $accordian.siblings()
		$accordian.parents('.accordian').addClass options.open_class
		$accordian.addClass options.open_class
		return

	Terminus.toggleAccordian = ($accordian) ->
		open = $accordian.hasClass('open')
		if open then Terminus.closeAccordian($accordian) else Terminus.openAccordian($accordian)
		return

	### ************************
		Private Functions
	************************ ###  
	
	_generateIcon = ->
		$i = $(document.createElement('i'))
		$i.addClass options.icon_class
		$i
		
	_initializeInstance = ->		
		instance = $(selector)

		unless _isValidQuery instance
			selector = defaults.selector
			instance = $(selector)

		if _isValidQuery(instance)
			if options == 'undefined' then options = {}
			options = $.extend defaults, options
			if _isValidString selector then options.selector = selector
			else options.selector = defaults.selector
		else
			console.log("Accordian Error")
		
		return

	_initializeAccordian = ($accordian) ->
		_initializeAccordianLink $accordian
		_initializeAccordianContent $accordian
		return

	_initializeAccordianLink = ($accordian) ->
		getDataLink = ($element) ->
			$element.find("*[data-accordian='open']");
	
		getIconLink = ($element) ->
			$element.children("i");
			
		getClassLink = ($element) ->
			$element.find(options.selector_link);
			
		getAnchorLink = ($element) ->
			if $element.hasClass options.selector_link and $element.is("a")
				$element
			else
				$children = $element.find("a");
				unless _isValidQuery($children) 
					$children = $element.children("*").children("a"); 
				$children
	
		getAccordianSource = ($element) ->
			if options.click_on == _click_on_type.link then getLinkBasedSource($element)
			else if options.click_on == _click_on_type.icon then getIconBasedSource($element)
		
		getLinkBasedSource = ($element) -> 
			$dataLink = getDataLink($element)
			$classLink = getClassLink($element)
			$anchorLink = getAnchorLink($element)

			if _isValidQuery $dataLink then $dataLink
			else if _isValidQuery $classLink then $classLink
			else if _isValidQuery $anchorLink then $anchorLink
			
			else getIconBasedSource($element)
				
		getIconBasedSource = ($element) -> 
			$classLink = getClassLink($element)
			$anchorLink = getAnchorLink($classLink)

			if _isValidQuery $classLink
				$icon = getIconLink()
				unless _isValidQuery $icon
					$icon = _generateIcon
					if _isValidQuery $anchorLink then $anchorLink.append $icon
					else $classLink.append($icon)
				else $icon
			else 
				$i = _generateIcon()
				$accordian.prepend($i)
				$i
		
		source = getAccordianSource($accordian)
		source.on "click", _onAccordianLinkClick
		
		
			
	_initializeAccordianContent = ($accordian) ->
		$content = $accordian.children(options.selector_content)
		return
		
	_isValidQuery = (query) ->
		query and query.length > 0 and query != undefined
		
	_isValidString = (str) -> 
		str == '' or typeof str != 'string'
		
	_onAccordianLinkClick = (e) ->
		$source = $(this)
		$parent = $source.parents options.selector
		Terminus.toggleAccordian $parent
		e.stopPropagation
		e.preventDefault
		false

	### ************************
		Public Functions
	************************ ###  

	@onCreate = ->
		_initializeInstance()
		
		$accordians = instance;
		$accordians.each (i, accordian) ->
	    	_initializeAccordian $(this)
	@open = (->
		Terminus.openAccordian @element
		return
	).bind(this)
	@close = (->
		Terminus.closeAccordian @element
		return
	).bind(this)

	### ************************
		Procedure
	************************ ###  

	@onCreate()

	### ************************
		Return Object
	************************ ### 

	this
	
accordian.bind(accordian);
module.exports = accordian