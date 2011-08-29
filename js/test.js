// JavaScript Document
window.onload  = onLoad;
var header ;
var urlLoader ;
var currentSongIndex=0;
function onLoad()
{
	if(FlashVars.getValue("songId"))youtubePlayer.songId = FlashVars.getValue("songId");
	
	
	
	header = new UIElement();
	header.name="header";
	header.styleName="header";
	header.build();
	header.setStyle();
	header.setWidth(stage.stageWidth());
	header.setHeight(50);
	header.x(0);
	header.y(0);
	header.addEventListener(Event.RESIZE,onResize);
	addChild(header);
	
	logo = new UIElement();
	logo.name="logo";
	logo.styleName="logo";
	logo.build();
	logo.setStyle();
	logo.setWidth(108);
	logo.setHeight(28);
	logo.x(10);
	logo.y(10);

	addChild(logo);
	
	searchBar = new TextField();
	searchBar.name="search";
	searchBar.styleName="search";
	searchBar.build();
	searchBar.setStyle();
	searchBar.setWidth(285);
	searchBar.setHeight(24);
	searchBar.x(200);
	searchBar.y(10);
	addChild(searchBar);
	
	footer = new UIElement();
	footer.name="footer";
	footer.styleName="footer";
	footer.build();
	footer.setStyle();
	footer.setWidth(stage.stageWidth());
	footer.setHeight(60);
	footer.x(0);
	footer.y(stage.stageHeight()-footer.getHeight());
	addChild(footer);
	
	
	middle = new UIElement();
	middle.name="middle";
	middle.styleName="middle";
	middle.build();
	middle.setStyle();
	middle.setWidth(stage.stageWidth()-(stage.stageWidth()* 0.3));
	middle.setHeight(stage.stageHeight()-header.getHeight()-footer.getHeight());
	middle.x(0);
	middle.y(header.getY()+header.getHeight());
	addChild(middle);
	
	youtubePlayer = new YoutubePlayer();
	youtubePlayer.name="youtubePlayer";
	youtubePlayer.styleName="youtubePlayer";
	
		//trace("here");
	youtubePlayer.build();
	youtubePlayer.setStyle();

	youtubePlayer.setWidth(middle.getWidth());
	
	youtubePlayer.setHeight(stage.stageHeight()-header.getHeight()-footer.getHeight());
	youtubePlayer.x(0);
	youtubePlayer.y(header.getY()+header.getHeight());
	addChild(youtubePlayer);
	
	playlist = new PlaylistView();
	playlist.name="playlist";
	playlist.styleName="playlist";
	playlist.build();
	playlist.setStyle();
	playlist.setWidth(stage.stageWidth()*0.3);
	playlist.setHeight(stage.stageHeight()-header.getHeight()-footer.getHeight());
	playlist.x(stage.stageWidth()-playlist.getWidth());
	playlist.y(header.getY()+header.getHeight());
	//playlist.addEventListener(MouseEvent.CLICK,onClick);
	addChild(playlist);
	
	
	urlLoader = new URLLoader();
	urlLoader.addEventListener(Event.ON_COMPLETE,onXMLLoad);
 	urlLoader.load("playlist.xml");
	
	logo.buttonMode(true);
	logo.addEventListener(MouseEvent.MOUSE_DOWN,onDown);
	logo.addEventListener(MouseEvent.MOUSE_UP,onUp);
	
	var t1 = new  Tween(logo,'alpha',Tween.elasticEaseOut,1,0,1);
	t1.start();
}
function onDown()
{
	logo.startDrag();
	//trace("down");
	
}
function onUp()
{
	
	logo.stopDrag();
}
function onXMLLoad()
{
	
	var songs = urlLoader.xml.getElementsByTagName("songs");
	var song = songs[0].getElementsByTagName("song");
	for(var b=0;b <song.length;b++)
	{
		var items =song[b].getElementsByTagName("item");
		var itemData = new PlaylistItemData();
		for(var a=0;a <items.length;a++)
		{
			//if(items[a].attributes.getNamedItem("id").value=="title")
			//{
				
				switch(items[a].attributes[0].value)
				{
					case "title":
					itemData.title = items[a].firstChild.nodeValue;
					break;
					case "actualId":
					itemData.actualId = items[a].firstChild.nodeValue;
					break;
					case "id":
					itemData.id = items[a].firstChild.nodeValue;
					break;
					case "keywords":
					itemData.keywords = items[a].firstChild.nodeValue;
					break;
					case "content":
					itemData.content = items[a].firstChild.nodeValue;
					break;
				}
				//trace("tiiire",itemData.title);
				
				
				//playlist
				
				
			//}
		}
		
		if(!playlist.data)playlist.data = new Array();
		playlist.data.push(itemData);
		
		
	}
	newEvent("YouTubeVideoEnded","YouTubeVideoEnded");
	playlist.arrange();
	window.songId = playlist.data[0].actualId;
//	youtubePlayer.init();
	youtubePlayer.addEventListener(YouTubeVideoEnded,onVideoEnded);
	
}

function onVideoEnded()
{
	
	if(currentSongIndex <playlist.data.length)
	{
		currentSongIndex++;
	}else{
		currentSongIndex=0;
	}
	youtubePlayer.playVideoById(playlist.data[currentSongIndex].actualId);
}

function onItemClick (e)
{
	currentSongIndex = parseInt(e.target.id.split('playlistItem').join(""));
	youtubePlayer.playVideoById(playlist.data[currentSongIndex].actualId);
	
}	

function onResize()
{
	
	
	header.x(0);
	var w = stage.stageWidth();
	//trace( (stage.stageWidth() * 0.1));
	header.setWidth(w);
	
	
	footer.setWidth(stage.stageWidth());
	footer.setHeight(60);
	footer.x(0);
	footer.y(stage.stageHeight()-footer.getHeight());
	
	
	middle.setWidth(stage.stageWidth()-(stage.stageWidth()* 0.3));
	middle.setHeight(stage.stageHeight()-header.getHeight()-footer.getHeight());
	middle.x(0);
	middle.y(header.getY()+header.getHeight());
	
	playlist.setWidth(stage.stageWidth()*0.3);
	playlist.setHeight(stage.stageHeight()-header.getHeight()-footer.getHeight());
	playlist.x(stage.stageWidth()-playlist.getWidth());
	playlist.y(header.getY()+header.getHeight());
	
	
	

	 youtubePlayer.setWidth(middle.getWidth());

	youtubePlayer.setHeight(stage.stageHeight()-header.getHeight()-footer.getHeight());
	
	youtubePlayer.x(0);
	youtubePlayer.y(header.getY()+header.getHeight());
	
	youtubePlayer.resize();
	
	//onYouTubePlayerAPIReady();
}
/*function onYouTubePlayerAPIReady() {
		trace("here",youtubePlayer.name)
        youtubePlayer.element = new YT.Player(youtubePlayer.name, {
          height: youtubePlayer.getWidth(),
          width: middle.getHeight(),
          videoId: 'JW5meKfy3fY',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
		
    }*/
/*	function onPlayerReady(evt) {
	
       var yt= document.getElementById("YoutubePlayerComponent");
	   yt.playVideo();
    }
    function onPlayerStateChange(evt) {
		trace("here");
        if (evt.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
    }
    function stopVideo() {
        player.stopVideo();
<<<<<<< .mine
    }*/
 
