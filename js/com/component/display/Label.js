(function(window) {
	extend(Label,DisplayObject);
function Label()
{

	this.element = document.createElement('p');
	
	this.setText=function(value)
	{
		this.element.innerHTML = value;
	}

	this.setDefaultStyle();
}
		
		
		
		
		
		
		
		  
window.Label = Label;
}(window));	