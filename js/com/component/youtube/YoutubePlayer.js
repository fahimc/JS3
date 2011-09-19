// JavaScript Document
(function(window) {
		  
function YoutubePlayer(){
	newEvent("YOUTUBE_READY");
	newEvent("YOUTUBE_VIDEO_ENDED");
	this.init();
	this.visible=function(value)
	{
		if(value==true)
				{
					this.element.style.visibility="visible";
					if(document.getElementById("YoutubePlayerComponent"))document.getElementById("YoutubePlayerComponent").style.visibility="visible";
				}else if(value==false){
					this.element.style.visibility="hidden";
					if(document.getElementById("YoutubePlayerComponent"))document.getElementById("YoutubePlayerComponent").style.visibility="hidden";
				}
	}
	}

	extend(YoutubePlayer,UIElement);
	
	// constructor:
	var public = YoutubePlayer.prototype;
	// public properties:
	public.player = document.createElement("div"); 
	public.songId = "";
	public.autoPlay=false;
	// private properties:
	
	// public methods:
	public.build = function() 
	{
	  //this.element = document.createElement('div');
      this.element.setAttribute('id',this.name);
	   this.player.setAttribute("id", "YoutubePlayerComponent"); 
	   
	   this.player.setAttribute("class", "YoutubePlayerComponent");
	  
	   this.player.style.width =100+"px"; 
	   this.player.style.height = 100+"px"; 
	   
	   this.player.style.top = 0+"px"; 
	   
	  this.element.appendChild(this.player); 
	 
	 	if(this.songId!="")
		{
			window.songId = this.songId;
			window.autoPlay = 1;
		}
		//if(autoPlay==true)window.autoPlay = 1;
	}
	public.setWidth = function (value)
	{
		
		 this.element.style.width =value+"px"; 
		 this.player.style.width =value+"px"; 
		  this.player.setAttribute("width",value);
		  
		 
	}
	public.setHeight = function (value)
	{
		 this.player.style.height =value+"px"; 
		this.element.style.height =value+"px"; 
		
	}
	public.initYoutube = function()
	{
		//create player div
	  
		window.autoPlay=true;
		// get youtube player
		var tag = document.createElement('script');
   	 	tag.src = "http://www.youtube.com/player_api";
    	var firstScriptTag = document.getElementsByTagName('script')[0];
    	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		
	}

	public.resize = function()
	{
		
		this.element.setHeight(200);
		this.element.setWidth(200);
		this.player.setHeight(200);
		this.player.setWidth(200);
		Yplayer.setSize(public.getWidth(),public.getHeight());
	}

	public.playVideoById =function(id)
	{	
	
		window.autoPlay=true;
		Yplayer.loadVideoById(id);
	}
	
	window.onYouTubePlayerAPIReady = function() {
		
		var sid =  '';
		var ap = 0;
		if(window.songId)sid = window.songId;
		if(window.autoPlay)ap =1;
		
		var yt= document.getElementById("YoutubePlayerComponent");
		var Yplayer = new YT.Player( 'YoutubePlayerComponent', {
		height:  yt.style.height,
		width:  yt.style.width,
		videoId:sid,
		 playerVars: {
			  'autoplay': ap, 
			  'controls': 1 ,
			  'enablejsapi': 1,
      		'origin': window.location.host
			  },
		events: {
		  'onReady': onPlayerReady,
		  'onStateChange': onPlayerStateChange
		}
	  });
	  window.Yplayer = Yplayer;
	}
	window.onPlayerReady =function(evt)
	 {
		//var yt= doument.getElementById("YoutubePlayerComponent");
      this.dispatch(YOUTUBE_READY);
	  //Yplayer.playVideo();
    }
	window.onPlayerStateChange =function(evt)
	 {
		 
		 if (evt.data == 0)this.dispatch(YOUTUBE_VIDEO_ENDED);
		//var yt= document.getElementById("YoutubePlayerComponent");
        //yt.playVideo();
    }

	window.onClick = function(evt)
	{
	//trace("key");
	//dispatchEvent(CustomEventCLICK,false);
	}

window.YoutubePlayer = YoutubePlayer;
}(window));	