// JavaScript Document
(function(window) {
	extend(Controller,DisplayObject);
function Controller()
{
	var public = Controller.prototype;
	public.mainView =MainView;
	public.init= function()
	{
		this.mainView.addEventListener(ButtonEvent_SEARCH_CLICKED.name,searchClicked);
		this.mainView.addEventListener(ButtonEvent_PLAYLIST_CLICKED.name,playListClicked);
		this.mainView.addEventListener(ButtonEvent_POPULAR_CLICKED.name,popularClicked);
		
	}
	function searchClicked (event)
	{
		trace("search",event.name);
	}
	 function playListClicked (event)
	{
		trace("playListClicked");
	}
	function popularClicked (event)
	{
		trace("popularClicked");
	}
}
window.Controller = Controller;
}(window));