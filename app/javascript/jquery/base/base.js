this.prepareCode = function(){
	var code = $("pre").children("code");
	code.filter(function(){ return $(this).hasClass("language-html")})
		.each(function(i, element){
		var $element = $(element);
		var html = $element.html();
		html = html.replace("<", "&lt;");
		$element.text(html);
	});
}

module.exports = this;