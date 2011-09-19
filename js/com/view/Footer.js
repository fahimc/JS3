// JavaScript Document
(function(window) {
	extend(Footer,DisplayObject);
function Footer()
{
	newEvent("FOOTER_PLAY_CLICKED");
	newEvent("FOOTER_PREVIOUS_CLICKED");
	newEvent("FOOTER_NEXT_CLICKED");

	var public =Footer.prototype;
	public.element =document.createElement('div');
	public.element.style.position = "absolute";
	var bg  = new UIElement();
	var gap =3;
	this.build =function()
   {	
		bg.styleName="footer";
		bg.build();
		bg.setStyle();
		bg.setWidth(stage.stageWidth());
		bg.setHeight(47);
		bg.arrange();
		this.addChild(bg);
   		
		previous = new UIElement();
		previous.styleName="previousBtn";
		previous.build();
		previous.setStyle();
		previous.arrange();
		previous.setHeight(29);
		previous.setWidth(28);
		previous.buttonMode(true);
		previous.addEventListener(MouseEvent.CLICK,onPreviousClick);
		this.addChild(previous);
		
		playBtn = new UIElement();
		playBtn.styleName="playBtn";
		playBtn.build();
		playBtn.setStyle();
		playBtn.setHeight(39);
		playBtn.setWidth(38);
		playBtn.arrange();
		playBtn.buttonMode(true);
		playBtn.addEventListener(MouseEvent.CLICK,onPlayClick);
		this.addChild(playBtn);
		
		pauseBtn = new UIElement();
		pauseBtn.styleName="pauseBtn";
		pauseBtn.build();
		pauseBtn.setStyle();
		pauseBtn.setHeight(39);
		pauseBtn.setWidth(38);
		pauseBtn.arrange();
		pauseBtn.buttonMode(true);
		pauseBtn.visible(false);
		this.addChild(pauseBtn);
		
		nextBtn = new UIElement();
		nextBtn.styleName="nextBtn";
		nextBtn.build();
		nextBtn.setStyle();
		nextBtn.setHeight(29);
		nextBtn.setWidth(28);
		nextBtn.buttonMode(true);
		nextBtn.arrange();
		nextBtn.addEventListener(MouseEvent.CLICK,onNextClick);
		this.addChild(nextBtn);
   }
	
	
	this.arrange=function()
	{
		bg.setWidth(stage.stageWidth());
		previous.x(10);
		previous.y((bg.getHeight() * 0.5)-(previous.getHeight() *0.5));
		playBtn.x(parseInt(previous.getX())+parseInt(previous.getWidth())+gap);
		playBtn.y((bg.getHeight() * 0.5)-(playBtn.getHeight() *0.5));
		pauseBtn.x(parseInt(previous.getX())+parseInt(previous.getWidth())+gap);
		pauseBtn.y((bg.getHeight() * 0.5)-(playBtn.getHeight() *0.5));
		nextBtn.x(parseInt(playBtn.getX())+parseInt(playBtn.getWidth())+gap);
		nextBtn.y((bg.getHeight() * 0.5)-(nextBtn.getHeight() *0.5));
	}
	public.getHeight=function()
	{
		
		return bg.getHeight();
	}
	function onPlayClick(e)
	{
		dispatch(FOOTER_PLAY_CLICKED);
	}
	function onNextClick(e)
	{
		dispatch(FOOTER_NEXT_CLICKED);
	}
	function onPreviousClick(e)
	{
		dispatch(FOOTER_PREVIOUS_CLICKED);
	}
}
window.Footer = Footer;
}(window));