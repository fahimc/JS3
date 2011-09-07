// JavaScript Document
(function(window) {
extend(YoutubeFeedService,URLLoader);
newEvent("FEED_COMPLETE");
function YoutubeFeedService()
{
	//public functions
	var collection = new Array();
	var prefix = "http://gdata.youtube.com/feeds/api/videos?q=";
	var suffix = "&orderby=published&max-results=50&v=2&alt=jsonc";
	var urlLoader;
	this.load = function(value)
	{
		urlLoader =new URLLoader();
		urlLoader.addEventListener(Event.ON_COMPLETE.name,onComplete);
		//urlLoader.load(prefix+value+suffix);
		
		urlLoader.load(FlashVars.getHostURL()+"php/getData.php?data="+escape(value));
	}
	function onComplete()
	{
		
		var jsondata=eval("("+urlLoader.data+")") //retrieve result as an JavaScript object
			 for(var a = 0; a < jsondata.data.items.length;a++)
			 {
				 collection.push(jsondata.data.items[a]);
			 }
		 dispatch(FEED_COMPLETE);
	}
	/*this.load = function(value)
	{
		var mygetrequest=new ajaxRequest()
		mygetrequest.onreadystatechange=function(){
			
		if (mygetrequest.readyState==4){
			
			 if (mygetrequest.status==200 || window.location.href.indexOf("http")==-1){
				
			var jsondata=eval("("+mygetrequest.responseText+")") //retrieve result as an JavaScript object
			 for(var a = 0; a < jsondata.data.items.length;a++)
			 {
				 collection.push(jsondata.data.items[a].title);
			 }
			 dispatch(FEED_COMPLETE);
			 alert(collection.length);
			 alert(jsondata.data.items[0].title);
		    var rssentries=jsondata.items;
	
		 }
			else{
			 alert("An error has occured making the request")
		 }
		 }
		}
		mygetrequest.open("GET", "http://gdata.youtube.com/feeds/api/videos?q="+value+"&orderby=published&max-results=50&v=2&alt=jsonc", true);
		mygetrequest.open("GET", "/playlist.xml", true)
		mygetrequest.send(null)
	}*/
	
	function ajaxRequest()
	{
		 var activexmodes=["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"] //activeX versions to check for in IE
		 if (window.ActiveXObject){ //Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)
		  for (var i=0; i<activexmodes.length; i++){
		   try{
			return new ActiveXObject(activexmodes[i])
		   }
		   catch(e){
			   alert(e);
			//suppress error
		   }
		  }
		 }
		 else if (window.XMLHttpRequest) // if Mozilla, Safari etc
		  return new XMLHttpRequest()
		 else
		  return false
	}
	this.getCollection =function()
	{
		return collection;
	}
}
	
	// constructor:
	var public = YoutubeFeedService.prototype;
	
	
window.YoutubeFeedService =  YoutubeFeedService;
}(window));	
