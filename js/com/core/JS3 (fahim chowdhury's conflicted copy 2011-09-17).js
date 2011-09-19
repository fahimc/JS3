// imports
IMPORT('js/com/events/Events');
	IMPORT('js/com/events/EventDispatcher');	
	IMPORT("js/com/component/display/DisplayObject");
	IMPORT("js/com/component/display/Stage");
	IMPORT("js/com/component/display/UIElement");
	IMPORT("js/com/component/display/Sprite");
//global variable



	/// stage

// addchild
function addChild(child)
{
	if(child.element)
	{
	    document.body.appendChild(child.element);	
	}else{
		document.body.appendChild(child);	
	}
}

function removeChild (child) 
{
	if(child.element)
	{
		document.body.removeChild(child.element);
	}else{
		document.body.removeChild(child);
	}
}

/// trace class
function trace ()
{
	var toSend="";
	for(var i in arguments) {
		toSend+=arguments[i]+",";
	}
	if(console && console.debugging)
	{
		console.message(toSend);
	}else{
	alert(toSend);
	}

}
// extension class
 function extend (subClass, baseClass) {
	
 //extendables.subClass.push(subClass);
 //extendables.baseClass.push(baseClass);
	
   function inheritance() {}
   inheritance.prototype = baseClass.prototype;

   subClass.prototype = new inheritance();
   subClass.prototype.constructor = subClass;
   subClass.baseConstructor = baseClass;
   subClass.superClass = baseClass.prototype;
 
}

///browser detection
function Browser()
{
	
  this.isIE = function() 
  {
	  var boolean=false;
	   if (navigator.appVersion.indexOf("MSIE") != -1)boolean=true;
	   return boolean;
  }
}

//// find relative x position
function findPosX(obj)
  {
	  tarce(obj.offsetParent.style.left);
    var curleft = 0;
    if(obj.offsetParent)
        while(1) 
        {
			var left = obj.style.left.split("px").join("");
			trace(left,curleft,obj.offsetParent);
          curleft = curleft+left;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
    else if(obj.x)
       curleft += obj.x;
    return curleft;
  }
//find relative y position
  function findPosY(obj)
  {
    var curtop = 0;
    if(obj.offsetParent)
        while(1)
        {
          curtop += obj.style.top;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
    else if(obj.y)
        curtop += obj.y;
    return curtop;
  }

// add meta tags
function META(name,content)
{
	
	var meta;
	if (document.createElement &&
	(meta = document.createElement('meta'))) {
		
	// set properties
	meta.name = name;
	meta.content = content;
	var head= document.getElementsByTagName('head')[0];
	// now add the meta element to the head
	head.appendChild(meta);
	meta=null;
	}

}
// import scripts
function IMPORT(value)
{
	/* var head= document.getElementsByTagName('head')[0];
   var script= document.createElement('script');
   script.type= 'text/javascript';
   script.src= value+'.js';

   // then bind the event to the callback function 
   // there are several events for cross browser compatibility
   script.onreadystatechange = callback(window);
   script.onload = callback(window);

   // fire the loading
   head.appendChild(script);*/
   document.write('<scr'+'ipt type="text/javascript" src="'+value+'.js" ></scr'+'ipt>');

}
