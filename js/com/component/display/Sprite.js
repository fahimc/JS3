// JavaScript Document

(function(window) {
extend(Sprite,DisplayObject);
function Sprite(){
	//extends
	this.init();
	// constructor:
	var public = Sprite.prototype;
	// public properties:
	public.name;
	// private properties:
	var lineThickness;
	var borderColor;
	// public methods:
	public.lineStyle = function(thickness,color)
	{
		color = colorCheck(color);
		lineThickness = thickness;
		borderColor = color;
		var styleString ="solid "+color+" "+thickness+"px";
		this.element.style.border= styleString;
	}
	public.beginFill = function(color,alpha)
	{
		this.element.style.position = "absolute";
		color = colorCheck(color);
		
		if(alpha) this.alpha(alpha);

		this.element.style.backgroundColor  = color; 
		//trace(this.element.style.backgroundColor,color);
	}
	public.drawRect = function(xx,yy,ww,hh)
	{
		this.x(xx);
		this.y(yy);
		this.setWidth(ww);
		this.setHeight(hh);
	}
	public.drawCircle = function(ww,hh,rad)
	{
		this.setWidth(ww);
		this.setHeight(hh);
		
		this.setCorners(rad);
	}
	public.drawRoundRect = function(xx,yy,ww,hh,rad)
	{
		this.x(xx);
		this.y(yy);
		this.setWidth(ww);
		this.setHeight(hh);
		this.setCorners(rad);
		
	}
	public.endFill = function ()
	{
		this.element.setAttribute('id', Math.floor(Math.random()*111111));
		this.element.setAttribute('name', Math.floor(Math.random()*111111));
	}
	// private methods
	function colorCheck(color)
	{
		return color.split("0x").join("#");
	}
	public.setCorners=function(rad)
	{
		

		this.element.style.behavior= 'url(js/com/utils/border-radius.htc)';
		 this.element.style.webkitBorderRadius = rad+"px";
		this.element.style.MozBorderRadius = rad+"px";
		this.element.style['-moz-border-radius']=rad+"px";
		this.element.style['border-radius']=rad+'px '+rad+'px '+rad+'px '+rad+'px'; 
	}
}
// end
window.Sprite = Sprite;
}(window));	