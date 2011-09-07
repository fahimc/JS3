// JavaScript Document
(function(window) {
	extend(URLLoader,DisplayObject);
function URLLoader(){
	
	
	// constructor:
	var public = URLLoader.prototype;
	// public properties:
	this.urlloader;
	//public.source = "http://fahimchowdhury.com/test/javascript/php/getData.php?url=";
	this.source = "playlist.xml";
	// private properties:
	var xhttp;
	this.data;
	this.xml;
	var obj = this;
	// public methods:
	this.load = function(url) 
	{
		if (window.XMLHttpRequest)
		  {
		  xhttp=new XMLHttpRequest();
		  }
		else // IE 5/6
		  {
		  	xhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		 xhttp.onreadystatechange=this.onStatus;
		xhttp.open("GET",url,true);
		
		try
		{
			
			xhttp.send();
		}catch(e)
		{
			trace("here",e);
		}
		
	}
	this.onStatus=function()
    {
		if (xhttp.readyState==4)
		{
			
		 if (xhttp.status==200 || window.location.href.indexOf("http")==-1)
      // if (xhttp.readyState==4 && xhttp.status==200)
    	{
			
    		//public.xml=xhttp.responseText;
			obj.data=xhttp.responseText;
			obj.xml=xhttp.responseXML;
			obj.dispatch(Event.ON_COMPLETE.name);
    	}else
		{
			//trace("error 1")
		}
		}else
		{
			//trace("error 2")
		}
	}

}
window.URLLoader =  URLLoader;
}(window));	
