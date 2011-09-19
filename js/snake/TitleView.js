(function(window) {
extend(TitleView,UIElement);
function TitleView(){
	//events
	newEvent("TITLE_BUTTON_CLICKED");
	this.init();
	var public = TitleView.prototype;
	var obj=this;
	var titlebg;
	// constructor:
	this.build=function()
	{
		titlebg = new UIElement();
		titlebg.styleName = "titlebg";
		titlebg.build();
		titlebg.setStyle();
		titlebg.setWidth(600);
		titlebg.setHeight(600);
		titlebg.arrange();
		this.addChild(titlebg);
		
		title = new UIElement();
		title.styleName = "title";
		title.build();
		title.setStyle();
		title.setWidth(600);
		title.setHeight(225);
		title.y(59);
		title.arrange();
		this.addChild(title);
		
		var button = new Button();
		button.upSkin = "buttonUp";
		button.overSkin = "buttonOver";
		button.downSkin = "buttonDown";
		button.setWidth(320);
		button.setHeight(107);
		button.build();
		button.setStyle();
		button.arrange();
		button.y(400);
		button.x((titlebg.getWidth() * 0.5)-(button.getWidth() *0.5));
		button.addEventListener(MouseEvent.MOUSE_UP,onClickItem);
		button.activate();
		this.addChild(button);
		
	}
	
	
	function onClickItem(e)
	{
		
		obj.dispatch(TITLE_BUTTON_CLICKED);
	}
	
}
window.TitleView = TitleView;
}(window));	