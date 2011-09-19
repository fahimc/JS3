// JavaScript Document
(function(window) {
	extend(Footer,DisplayObject);
function Footer()
{
	

	var public =Footer.prototype;
	public.element =document.createElement('div');
	public.element.style.position = "absolute";
	var bg  = new UIElement();
	this.build =function()
   {	
	bg.styleName="footer";
	bg.build();
	bg.setStyle();
	bg.setWidth(stage.stageWidth());
	bg.setHeight(47);
	bg.arrange();
	this.addChild(bg);
   }
	
	
	this.arrange=function()
	{
	}
	public.getHeight=function()
	{
		
		return bg.getHeight();
	}
}
window.Footer = Footer;
}(window));