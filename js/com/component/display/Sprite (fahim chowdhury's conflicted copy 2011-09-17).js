// JavaScript Document
(function(window) {
function Sprite(){}
	//extends
	extend(Sprite,DisplayObject);
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
	
// end
window.Sprite = Sprite;
}(window));	