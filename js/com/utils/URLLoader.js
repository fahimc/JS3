// JavaScript Document
(function(window) {
function URLLoader(){}
	
	extend(URLLoader,DisplayObject);
	// constructor:
	var public = URLLoader.prototype;
	// public properties:
	public.urlloader;
	//public.source = "http://fahimchowdhury.com/test/javascript/php/getData.php?url=";
	public.source = "playlist.xml";
	// private properties:
	var xhttp;
	public.xml;
	// public methods:
	public.load = function(url) 
	{
		if (window.XMLHttpRequest)
		  {
		  xhttp=new XMLHttpRequest();
		  }
		else // IE 5/6
		  {
		  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		 xhttp.onreadystatechange=onStatus;
		 try
		{
		 	xhttp.open("GET",url,true);
		}catch(e)
		{
			//trace("here",e);
		}
		try
		{
			xhttp.send();
		}catch(e)
		{
			//trace("here",e);
		}
		
	}
	function onStatus()
    {
       if (xhttp.readyState==4 && xhttp.status==200)
    	{
		
    		//public.xml=xhttp.responseText;
			public.xml=xhttp.responseXML;
			
			dispatchEvent(Event.ON_COMPLETE,true,false);
    	}
	}


window.URLLoader =  URLLoader;
}(window));	
