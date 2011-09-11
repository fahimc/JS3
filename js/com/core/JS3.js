//!  A core class. 
/*!
  JS3 core.
*/

// imports
IMPORT('js/com/events/Events');
		
	IMPORT('js/com/events/EventDispatcher');
	IMPORT("js/com/component/display/DisplayObject");
	IMPORT('js/com/utils/Timer');
	IMPORT("js/com/component/display/DisplayImage");
	IMPORT("js/com/component/display/Label");
	IMPORT("js/com/component/display/Stage");
	IMPORT("js/com/component/display/UIElement");
	IMPORT("js/com/component/display/Sprite");
	IMPORT("js/com/utils/FlashVars");
//global variable
var enterFrameCallBacks=new Array();
var enterFrameTimer;
window.stageChildren=[];
function onEnterFrame(callback)
{
	enterFrameCallBacks.push(callback);
		if(!enterFrameTimer)
		{
			enterFrameTimer =new Timer(stage.frameRate);
			enterFrameTimer.addEventListener(TimerEvent.TIMER.name,onEnterFrameTimer);
			enterFrameTimer.start();
		}
}
function onEnterFrameTimer()
{
	for(var a=0;a<enterFrameCallBacks.length;a++)
	{
		enterFrameCallBacks[a]();
	}
}
function removeEnterFrame(callback)
{
	
	for(var a=0;a<enterFrameCallBacks.length;a++)
	{
		if(enterFrameCallBacks[a]==callback)
		{
			enterFrameCallBacks.splice( a, 1 );
		}
	}
	if(enterFrameCallBacks.length==0)
	{
		enterFrameTimer.stop();
		enterFrameTimer.removeEventListener(TimerEvent.TIMER.name,onEnterFrameTimer);
		enterFrameTimer=null;
	}
}
	/// stage
//! An addChild.
/*! More detailed enum description. */
/*!< Enum value child. */  

// addchild
function addChild(child)
{
	stageChildren.push(child);
	if(child.element)
	{
		child.purge();
	    document.body.appendChild(child.element);	
	}else{
		document.body.appendChild(child);	
	}
}

function removeChild (child) 
{
	for(var a=0;a<stageChildren.length;a++)
	{
		if(stageChildren[a] ==child)
		{
			stageChildren.splice(a,1);
			a=stageChildren.length+1;
		}
	}
	if(child.element)
	{
		document.body.removeChild(child.element);
	}else{
		document.body.removeChild(child);
	}
}
function contains(child) 
{
	if(this.stageChildren)
	{
		for(var a=0;a<stageChildren.length;a++)
		{
			if(stageChildren[a] ==child)
			{
				return true;
			}
		}
	}
	return false;
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
//global dispatch
function dispatch(value)
{
	stage.dispatch(value);
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
// get css value
function getCssValue(selector, attribute) {
        var raw = getRawCss(selector);
		
        if (!raw) {
            return null;
        }
        var parts = raw.split(';');
		
        for (var i in parts) {
           // var subparts = parts[i].split(':');
		  // trace(parts[i]);
			//trace("subparts",subparts[0].indexOf(attribute));
			if(parts[i].indexOf(attribute)>-1){
           // if (trimString(subparts[0]) == attribute) {
			   // if the is a trailing bracket remove it
			   var subpart =parts[i].split('{');
			   // if sub part has trailing bracket remove first node
			   if(subpart.length>1)
			   {
				   subpart = subpart[1];
			   }else{
			   	subpart = subpart[0];
			   }
			   // see if subpart has attribute name
			   subpart =subpart.split(attribute);
			 
			   // if sub part has trailing attribute name remove first node
			    if(subpart.length>1)
				{
					subpart = subpart[1];
				}else{
					subpart = subpart[0];
				}
				// if subpart has colon
				if(subpart.charAt(0)==":")
				{
					subpart=subpart.substring(1);
					
				}
			   // if sub part has trailing colon name remove first node
			   
                return subpart;
            }
        }
        return null;
    }

    function trimString(s) {
        return s.replace(/^\s+|\s+$/g, ""); 
    }

    function getRawCss(selector) {
        for (var i = 0; i < document.styleSheets.length; i++) {
            var css = document.styleSheets[i].rules || document.styleSheets[i].cssRules;
            for (var x = 0; x < css.length; x++) {
				
                if (css[x].selectorText == selector) {
                    return (css[x].cssText) ? css[x].cssText : css[x].style.cssText;
                }
            }
        }
        return null;
    }


//
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
