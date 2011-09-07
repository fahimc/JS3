// JavaScript Document
(function(window) {
	extend(Controller,DisplayObject);
	
	//events
	newEvent("SHOW_FEED_RESULTS");
	
function Controller()
{
	var SEARCH_STATE = "SEARCH_STATE";
	var PLAYLIST_STATE = "PLAYLIST_STATE";
	var POPULAR_STATE = "POPULAR_STATE";
	
	var public = Controller.prototype;
	var searchView;
	var playlistView;
	var mv;
	var state="";
	var feed;
	var model;
	public.init= function()
	{

		mv.addEventListener(ButtonEvent_SEARCH_CLICKED.name,searchClicked);
		mv.addEventListener(ButtonEvent_PLAYLIST_CLICKED.name,playListClicked);
		mv.addEventListener(ButtonEvent_POPULAR_CLICKED.name,popularClicked);
		mv.addEventListener(SEARCHBOX_CLICKED.name,searchboxClicked);
		
	}
	function searchboxClicked(event)
	{
		feed = new YoutubeFeedService();
		stage.addEventListener(FEED_COMPLETE,onFeedComplete);
		feed.load(searchView.getText());
		
		//trace(searchView.getText());
	}
	function onFeedComplete(event)
	{
		//feed.getCollection();
		 model.feedCollection = feed.getCollection();
		 dispatch(SHOW_FEED_RESULTS.name);
	}
	function searchClicked (event)
	{
		
		switchView();
		if(!searchView)
		{
			searchView = new SearchView();
			searchView.setMaxHeight(mv.getMiddleHeight());
			searchView.setModel(model);
			searchView.build();
			searchView.arrange();
			searchView.y(mv.getTopHeight());
		}
	    addChild(searchView);
		state = SEARCH_STATE;
	}
	 function playListClicked (event)
	{
		switchView();
		if(!playlistView)
		{
			playlistView = new PlaylistView();
			playlistView.setMaxHeight(mv.getMiddleHeight());
			playlistView.setModel(model);
			playlistView.build();
			playlistView.arrange();
			playlistView.y(mv.getTopHeight());
		}
	    addChild(playlistView);
		state = PLAYLIST_STATE;
	}
	function popularClicked (event)
	{
		switchView();
		//trace("popularClicked");
	}
	public.mainView =function(value)
	{
		mv = value;
	}
	public.arrange=function()
	{
		if(mv)
		{
			mv.arrange();
		}
		if(searchView)
		{
			//searchView.setMaxHeight(mv.getMiddleHeight());
			searchView.arrange();
		}
		if(mv)mv.arrange();
	}
	function switchView()
	{
		switch(state)
		{
			case SEARCH_STATE:
			removeChild(searchView);
			break;
			case PLAYLIST_STATE:
			removeChild(playlistView);
			break;
		}
		state="";
	}
	 this.setModel=function(value)
   {
	   model =value;
   }
   this.getModel=function()
   {
	   return model;
   }
}
window.Controller = Controller;
}(window));