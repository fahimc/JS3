// JavaScript Document
(function(window) {
function TextField(){}

	extend(TextField,UIElement);
	// constructor:
	var public = TextField.prototype;
	// public properties:
	public.textfield;
	public.right=0;
	// private properties:
	
	// public methods:
	public.build = function() 
	{
		if(this.backgroundUrl)
		{
			
			this.backgroundImage = document.createElement('img');
			this.backgroundImage.setAttribute('height', '100%');
			this.backgroundImage.setAttribute('width', '100%');
			this.backgroundImage.setAttribute("src",this.backgroundUrl);
			this.backgroundImage.style.position = "absolute";
			this.element.appendChild(this.backgroundImage);
		}
		
	  this.textfield = document.createElement('input');
	  this.textfield.setAttribute('type','text');
	  
	  this.textfield.style.background="transparent";
	   this.textfield.style.position = "absolute";
	  this.element.appendChild(this.textfield);
	 // trace("build");
	}
	public.setStyle = function() 
	{
		
		this.element.setAttribute("class",this.styleName);
		 this.textfield.setAttribute("class",this.styleName);
	     this.textfield.style.width =(this.getWidth()-this.right)+"px";
		 this.setDefaultStyle();
		 per=null;
		 
	}
	
	public.text =function(value)
	{
		 this.element.value=value;
	}
	
window.TextField = TextField;
}(window));	