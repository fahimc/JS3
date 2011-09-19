// JavaScript Document
(function(window) {
function YoutubeFeedService(){}

	// constructor:
	var public = URLLoader.prototype;
	
	//public functions
	this.load = function()
	{
		var mygetrequest=new ajaxRequest()
	mygetrequest.onreadystatechange=function(){
		
 	if (mygetrequest.readyState==4){
		
 		 if (mygetrequest.status==200 || window.location.href.indexOf("http")==-1){
			
   		var jsondata=eval("("+mygetrequest.responseText+")") //retrieve result as an JavaScript object
		 alert(jsondata.data.items[0].title);
  	 var rssentries=jsondata.items;

 	 }
  		else{
  		 alert("An error has occured making the request")
 	 }
	 }
	}
	mygetrequest.open("GET", "http://gdata.youtube.com/feeds/api/videos?q=TedxConejo&orderby=published&max-results=50&v=2&alt=jsonc", true);
	//mygetrequest.open("GET", "/playlist.xml", true)
	mygetrequest.send(null)
	}
	
	function ajaxRequest(){
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
window.YoutubeFeedService =  YoutubeFeedService;
}(window));	
