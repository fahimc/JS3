// JavaScript Document
(function(window) {
	
function TextField()
{
	extend(TextField,UIElement);
	this.init();
	this.setWidth =function(value)
	{
		
		 this.textfield.style.width = value+"px";
		 this.element.style.width = value+"px";
	}
	this.setHeight =function(value)
	{
		
		 this.textfield.style.height = value+"px";
		 this.element.style.height = value+"px";
	}
}

	
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
			this.childHolder.appendChild(this.backgroundImage);
		}
		
	  this.textfield = document.createElement('input');
	  this.textfield.setAttribute('type','text');
	   
	  this.textfield.style.background="transparent";
	   this.textfield.style.position = "absolute";
	  this.addChild(this.textfield);
	 // trace("build");
	}
	public.setStyle = function() 
	{
		
		this.element.setAttribute("class",this.styleName);
		 this.textfield.setAttribute("class",this.styleName);
	     this.textfield.style.width =(this.getWidth()-this.right)+"px";
		 this.setDefaultStyle();
		
		 
	}
	
	public.text =function(value)
	{
		 this.textfield.value=value;
	}
	public.getText =function()
	{
		return  this.textfield.value;
	}

window.TextField = TextField;
}(window));	