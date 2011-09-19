(function(window) {
	extend(Label,UIElement);
function Label()
{
	// init
	this.init();
	// private variables
	var label;
	
	
	this.build=function()
	{
		label = document.createElement('p');
		label.setAttribute("class",this.styleName);
		this.addChild(label);
		
	}
	this.setText=function(value)
	{
		label.innerHTML = value;
	}
	this.setStyle = function() 
	{
		
		 label.style.position = "absolute";
		label.style.padding="0px";
		label.style.margin="0px";
		 this.setDefaultStyle();
		
		 
	}
	
}
		
		
		
		
		
		
		
		  
window.Label = Label;
}(window));	