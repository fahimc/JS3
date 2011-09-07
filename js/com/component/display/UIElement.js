// JavaScript Document
(function(window) {
function UIElement(){}
	
	//extends
	extend(UIElement,DisplayObject);
	
	
	// constructor:
	var public = UIElement.prototype;
	// public properties:
	public.name;
	public.styleName;
	public.backgroundImageSrc;
	public.backgroundImage;
	public.backgroundUrl
	// private properties:
	this.label=null;
	// public methods:
	
			public.build = function() 
			{
				
			  this.element = document.createElement('div');
			  this.element.setAttribute('id',this.name);
			 // this.backgroundImage.setAttribute('id',this.name);	
			  //public.element.innerHTML  = "hello world";
			 // trace("build");
			}
			public.setStyle = function() 
			{
				//trace(this.backgroundImageSrc);
				 this.element.setAttribute("class",this.styleName);
				if(this.backgroundUrl)
				{
					
					this.backgroundImage = document.createElement('img');
					this.backgroundImage.setAttribute('height', '100%');
					this.backgroundImage.setAttribute('width', '100%');
					this.backgroundImage.setAttribute("src",this.backgroundUrl);
					this.element.appendChild(this.backgroundImage);
				}
				 this.setDefaultStyle();
				 
			}
			public.arrange = function() 
			{
				
			}
			public.purge = function() 
			{
				
			}
			public.setDefaultStyle = function()
			{
				this.element.style.position = "absolute";
			}
			public.text =function(value)
			{
				if(!this.label)
				{
				this.label = document.createElement("p");
				this.label.style.padding="0px";
				this.label.style.margin="0px";
     		    var oText = document.createTextNode(value);
                this.label.appendChild(oText);
                this.element.appendChild(this.label);
				}else{
				 this.label.innerHTML=value;
				}
			}
window.UIElement = UIElement;
}(window));	
//extendables.subClass.push(UIElement);
// add subclass
