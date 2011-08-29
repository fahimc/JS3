// JavaScript Document
(function(window) {
function TextField(){}

	extend(TextField,UIElement);
	// constructor:
	var public = TextField.prototype;
	// public properties:
	
	// private properties:
	
	// public methods:
	public.build = function() 
	{
	  this.element = document.createElement('input');
	  this.element.setAttribute('type','text');
	 // trace("build");
	}
	public.text =function(value)
	{
		 this.element.value=value;
	}
window.TextField = TextField;
}(window));	