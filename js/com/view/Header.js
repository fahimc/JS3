// JavaScript Document
(function(window) {
	extend(Header,DisplayObject);
function Header()
{
	

	var public =Header.prototype;
	public.element =document.createElement('div');
	public.element.style.position = "absolute";
	var  bg  = new UIElement();
	var logo  = new UIElement();
	
	
	this.build =function()
   {

	bg.styleName="header";
	bg.build();
	bg.setStyle();
	bg.setWidth(stage.stageWidth());
	bg.setHeight(30);
	bg.arrange();
	this.addChild(bg);

	logo.styleName = "logo";	
	logo.build();
	logo.setStyle();
	logo.setHeight(13);
	logo.arrange();
	this.addChild(logo);
   }
	this.arrange=function()
	{
		bg.setWidth(stage.stageWidth());
		logo.y((bg.getHeight() *0.5)-(logo.getHeight()* 0.5));
	}
	this.getHeight=function()
	{
		return bg.getHeight();
	}
}
window.Header = Header;
}(window));