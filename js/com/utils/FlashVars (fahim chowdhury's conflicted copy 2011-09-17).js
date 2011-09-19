// JavaScript Document
(function(window) {
function FlashVars(){}

	// constructor:
	var public = FlashVars.prototype;
	// public properties:
	
	// private properties:
	
	// public methods:
	public.getValue = function(name) 
	{

	   name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
 	   var regexS = "[\\?&]"+name+"=([^&#]*)";
       var regex = new RegExp( regexS );
       var results = regex.exec( window.location.href );
       if( results == null )
       return "";
       else
       return results[1];
	}

window.FlashVars = new FlashVars();
}(window));	