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
	var videoItem = new UIElement();
	var sep =  new UIElement();
	var sep2 =  new UIElement();
	var sep3 =  new UIElement();
	var horizontalGap=10;
	//events
	newEvent("ButtonEvent_SEARCH_CLICKED");
	newEvent("ButtonEvent_PLAYLIST_CLICKED");
	newEvent("ButtonEvent_POPULAR_CLICKED");
	newEvent("ButtonEvent_VIDEO_CLICKED");
	
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
		searchItem.addEventListener(MouseEvent.CLICK,this.onSearchButtonClick);
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
		playlistItem.addEventListener(MouseEvent.CLICK,this.onPlaylistButtonClick);
		this.addChild(playlistItem);
		
		
		sep2.styleName = "sep";
		sep2.build();
		sep2.setStyle();
		sep2.setHeight(24);
		sep2.setWidth(3);
		sep2.arrange();
		this.addChild(sep2);
		
		popularItem.styleName = "poppularIconButtonUp";
		popularItem.build();
		popularItem.setStyle();
		popularItem.setHeight(24);
		popularItem.setWidth(24);
		popularItem.arrange();
		popularItem.buttonMode(true);
		popularItem.addEventListener(MouseEvent.CLICK,this.onPopularButtonClick);
		this.addChild(popularItem);
		
		
		sep3.styleName = "sep";
		sep3.build();
		sep3.setStyle();
		sep3.setHeight(24);
		sep3.setWidth(3);
		sep3.arrange();
		this.addChild(sep3);
		
		videoItem.styleName = "videoIconButtonUp";
		videoItem.build();
		videoItem.setStyle();
		videoItem.setHeight(23);
		videoItem.setWidth(34);
		videoItem.arrange();
		videoItem.buttonMode(true);
		videoItem.addEventListener(MouseEvent.CLICK,this.onVideoButtonClick);
		this.addChild(videoItem);
   }
	
	
	this.arrange=function()
	{
		bg.setWidth(stage.stageWidth());
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
		
		sep3.y((bg.getHeight() * 0.5 )-(sep3.getHeight() * 0.5));
		sep3.x(parseInt(popularItem.getX())+parseInt(popularItem.getWidth())+horizontalGap);
		
		videoItem.y((bg.getHeight() * 0.5 )-(videoItem.getHeight() * 0.5));
		videoItem.x(parseInt(sep3.getX())+parseInt(sep3.getWidth())+horizontalGap);
	}
	public.getHeight=function()
	{
		
		return bg.getHeight();
	}
	 public.onSearchButtonClick=function(evt)
	{
		obj.dispatch(ButtonEvent_SEARCH_CLICKED.name);
	}
	 public.onPlaylistButtonClick=function(evt)
	{
			obj.dispatch(ButtonEvent_PLAYLIST_CLICKED.name);
	}
	public.onPopularButtonClick=function(evt)
	{
			obj.dispatch(ButtonEvent_PLAYLIST_CLICKED.name);
	}
	public.onVideoButtonClick=function(evt)
	{
			obj.dispatch(ButtonEvent_VIDEO_CLICKED.name);
	}
	
}
window.Nav = Nav;
}(window));