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
	var VIDEO_STATE = "VIDEO_STATE";
	var PLAY_STATE = "PLAY_STATE";
	var PLAY_NEXT_STATE = "PLAY_NEXT_STATE";
	var PLAY_PREVIOUS_STATE = "PLAY_PREVIOUS_STATE";
	
	var public = Controller.prototype;
	var searchView;
	var playlistView;
	var mv;
	var state="";
	var feed;
	var model;
	var youtubePlayer;
	public.init= function()
	{
		youtubePlayer = new YoutubePlayer();
		youtubePlayer.build();
		youtubePlayer.setStyle();
		youtubePlayer.arrange();
		youtubePlayer.setWidth(stage.stageWidth());
		youtubePlayer.setHeight(mv.getMiddleHeight());
		youtubePlayer.y(mv.getTopHeight());
		youtubePlayer.addEventListener(YOUTUBE_READY,onYoutubeReady);
		youtubePlayer.addEventListener(YOUTUBE_VIDEO_ENDED,onYoutubeVideoEnd);
		youtubePlayer.visible(false);
		youtubePlayer.initYoutube();
		
		addChild(youtubePlayer);
		mv.addEventListener(ButtonEvent_SEARCH_CLICKED.name,searchClicked);
		mv.addEventListener(ButtonEvent_PLAYLIST_CLICKED.name,playListClicked);
		mv.addEventListener(ButtonEvent_POPULAR_CLICKED.name,popularClicked);
		mv.addEventListener(ButtonEvent_VIDEO_CLICKED.name,videoClicked);
		mv.addEventListener(SEARCHBOX_CLICKED.name,searchboxClicked);
		
		stage.addEventListener(FOOTER_PLAY_CLICKED,onPlayControlClick);
		stage.addEventListener(FOOTER_NEXT_CLICKED,onNextControlClick);
		stage.addEventListener(FOOTER_PREVIOUS_CLICKED,onPreviousControlClick);
	}
	function onPlayControlClick(evt)
	{
		model.playerState=PLAY_STATE;
		onYoutubeVideoEnd(evt)
		
	}
	function onNextControlClick(evt)
	{
		model.playerState=PLAY_NEXT_STATE;
		onYoutubeVideoEnd(evt)
		
	}
	function onPreviousControlClick(evt)
	{
		model.playerState=PLAY_PREVIOUS_STATE;
		onYoutubeVideoEnd(evt)
		
	}
	function onYoutubeVideoEnd(evt)
	{
		if(model.currentPosition<model.getPlaylistCollection().length>0)
		{
			switch(model.playerState)
			{
				case "":
					model.currentPosition++;
				break;
				case PLAY_STATE:
					model.playerState="";
				break;
				case PLAY_NEXT_STATE:
					model.currentPosition++;
					model.playerState="";
				break;
				case PLAY_PREVIOUS_STATE:
					model.currentPosition--;
					model.playerState="";
				break;
			}
			
			if(model.currentPosition<model.getPlaylistCollection().length)
			{
				model.currentSongId = model.getPlaylistCollection()[model.currentPosition][0].id;
			}else{
				model.currentPosition=0;
				model.currentSongId = model.getPlaylistCollection()[model.currentPosition][0].id;
			}
			youtubePlayer.playVideoById(model.currentSongId);
			//if(model.playerState==PLAY_STATE)model.currentPosition++;
		}
	}
	function videoClicked (event)
	{
		switchView();
		youtubePlayer.visible(true);
		state = VIDEO_STATE;
	}
	function onYoutubeReady(evt)
	{
		if(state != VIDEO_STATE)
		{
			youtubePlayer.visible(false);
		}
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
			playlistView.addEventListener(PLAY_SONG_BY_ID,onPLaySongById);
		}
	    addChild(playlistView);
		state = PLAYLIST_STATE;
	}
	function onPLaySongById(evt)
	{
		youtubePlayer.playVideoById(model.currentSongId);
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
			playlistView.purge();
			playlistView=null;
			break;
			case VIDEO_STATE:
			youtubePlayer.visible(false);
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