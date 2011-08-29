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
	this.label=null;
	// private properties:
	
	// public methods:
	
			public.build = function() 
			{
				
			  this.element = document.createElement('div');
			  this.element.setAttribute('id',this.name);
			
			  //public.element.innerHTML  = "hello world";
			 // trace("build");
			}
			public.setStyle = function() 
			{
				
				 this.element.setAttribute("class",this.styleName);
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
