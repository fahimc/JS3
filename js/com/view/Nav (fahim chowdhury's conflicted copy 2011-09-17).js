// JavaScript Document
(function(window) {
	extend(Nav,DisplayObject);
function Nav()
{
	
	//public
	var public =Nav.prototype;
	var obj=this;
	public.element =document.createElement('div');
	public.element.style.position = "absolute";
	
	//private
	var bg  = new UIElement();
	var searchItem = new UIElement();
	var playlistItem = new UIElement();
	var popularItem = new UIElement();
	var sep =  new UIElement();
	var sep2 =  new UIElement();
	var horizontalGap=10;
	//events
	newEvent("ButtonEvent_SEARCH_CLICKED");
	newEvent("ButtonEvent_PLAYLIST_CLICKED");
	newEvent("ButtonEvent_POPULAR_CLICKED");
	
	this.build =function()
   {	
   		this.obj = this;
		bg.styleName="nav";
		bg.build();
		bg.setStyle();
		bg.setWidth(stage.stageWidth());
		bg.setHeight(40);
		bg.arrange();
		this.addChild(bg);
		
		//navitems
		searchItem.styleName = "searchIconButtonUp";
		searchItem.build();
		searchItem.setStyle();
		searchItem.setHeight(24);
		searchItem.setWidth(23);
		searchItem.arrange();
		searchItem.buttonMode(true);
		searchItem.addEventListener(MouseEvent.CLICK,this.onButtonClick);
		this.addChild(searchItem);
		
		sep.styleName = "sep";
		sep.build();
		sep.setStyle();
		sep.setHeight(24);
		sep.setWidth(3);
		sep.arrange();
		this.addChild(sep);
		
		playlistItem.styleName = "playlistIconButtonUp";
		playlistItem.build();
		playlistItem.setStyle();
		playlistItem.setHeight(18);
		playlistItem.setWidth(33);
		playlistItem.arrange();
		playlistItem.buttonMode(true);
		playlistItem.addEventListener(MouseEvent.CLICK,this.onButtonClick);
		this.addChild(playlistItem);
		
		popularItem.styleName = "poppularIconButtonUp";
		popularItem.build();
		popularItem.setStyle();
		popularItem.setHeight(24);
		popularItem.setWidth(24);
		popularItem.arrange();
		popularItem.buttonMode(true);
		popularItem.addEventListener(MouseEvent.CLICK,this.onButtonClick);
		this.addChild(popularItem);
		
		sep2.styleName = "sep";
		sep2.build();
		sep2.setStyle();
		sep2.setHeight(24);
		sep2.setWidth(3);
		sep2.arrange();
		this.addChild(sep2);
   }
	
	
	this.arrange=function()
	{
		searchItem.y((bg.getHeight() * 0.5 )-(searchItem.getHeight() * 0.5));
		searchItem.x(horizontalGap);
		sep.y((bg.getHeight() * 0.5 )-(sep.getHeight() * 0.5));
		sep.x(parseInt(searchItem.getX())+parseInt(searchItem.getWidth())+horizontalGap);
		
		
		playlistItem.y((bg.getHeight() * 0.5 )-(playlistItem.getHeight() * 0.5));
		playlistItem.x(parseInt(sep.getX())+parseInt(sep.getWidth())+horizontalGap);
		
		sep2.y((bg.getHeight() * 0.5 )-(sep2.getHeight() * 0.5));
		sep2.x(parseInt(playlistItem.getX())+parseInt(playlistItem.getWidth())+horizontalGap);
		
		
		popularItem.y((bg.getHeight() * 0.5 )-(popularItem.getHeight() * 0.5));
		popularItem.x(parseInt(sep2.getX())+parseInt(sep2.getWidth())+horizontalGap);
	}
	public.getHeight=function()
	{
		
		return bg.getHeight();
	}
	 public.onButtonClick=function(event)
	{
		
		switch(event.target)
		{
			case searchItem.element:
				obj.dispatch(ButtonEvent_SEARCH_CLICKED.name);
			break;
			case playlistItem.element:
				obj.dispatch(ButtonEvent_PLAYLIST_CLICKED.name);
			break;
			case popularItem.element:
				obj.dispatch(ButtonEvent_POPULAR_CLICKED.name);
			break;
		}
	}
	
}
window.Nav = Nav;
}(window));