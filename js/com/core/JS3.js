//!  A core class. 
/*!
  JS3 core.
*/
//global variable
var enterFrameCallBacks=new Array();
var enterFrameTimer;
window.stageChildren=[];
var embedables = new Array();
var importArray = new Array();
window.js3events=[];
// standard events
window.Event =
{
	RESIZE:{name:"resize",target:window,on:true},
	ON_STAGE_LOAD:{name:"load",target:window,on:true},
	ADDED_TO_STAGE:{name:"ADDED_TO_STAGE",target:window,on:true},
	ON_COMPLETE:{name:"ON_COMPLETE",target:window},
	ENTER_FRAME:{name:"ENTER_FRAME",target:window},
	EMBEDS_LOADED:{name:"EMBEDS_LOADED",target:window},
	STAGE_LOAD_COMPLETE:{name:"STAGE_LOAD_COMPLETE",target:window}
};
// imports
IMPORT('js/com/events/Events');
		
	IMPORT('js/com/events/EventDispatcher');
	IMPORT("js/com/component/display/DisplayObject");
	IMPORT("js/com/component/display/UIElement");
	IMPORT('js/com/utils/Timer');
	IMPORT("js/com/component/display/DisplayImage");
	IMPORT("js/com/component/display/Label");
	IMPORT("js/com/component/display/Stage");
	
	IMPORT("js/com/component/display/Sprite");
	IMPORT("js/com/utils/FlashVars");

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
//embed
function Embed(src,name)
{
	embedables.push({src:src,name:name});
}

// addchild
function addChild(child)
{
	stageChildren.push(child);
	if(child.element)
	{
		
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
	/////////////
	
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
	  
   /* var curleft = 0;
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
    return curleft;*/
	
    var curleft = 0;
      var curtop = 0;
      if (obj.offsetParent) {
            do {
                  curleft += obj.offsetLeft;
                  curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
      }
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
function META(name,content,prop)
{
	
	var meta;
	if (document.createElement &&
	(meta = document.createElement('meta'))) {
		
	// set properties
	if(name)meta.name = name;
	meta.content = content;
	if(prop)meta.property = prop;
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
			if(css)
			{
            for (var x = 0; x < css.length; x++) {
				
                if (css[x].selectorText == selector) {
                    return (css[x].cssText) ? css[x].cssText : css[x].style.cssText;
                }
            }
			}
        }
        return null;
    }
	

window.DragHandler = DragHandler; 

function DragHandler() {
 
 	var public = DragHandler.prototype;
	// private property.
	var _oElem = null;
 	var _rectX=null;
	var _rectY=null;
	var _rectWidth=null;
	var _rectHeight=null;
 	var _startX=null;
	var _startY=null;
	var element=null;
	var pause = false
	this.setPause=function(value)
	{
		pause=value;
	}
	// public method. Attach drag handler to an element.
	this.attach =function(oElem,auto,xx,yy,ww,hh) {
		element = oElem.element;
		
		//oElem.onmousedown = this._dragBegin;
		if(auto!=true)
		{
			oElem.addEventListener(MouseEvent.MOUSE_DOWN,this._dragBegin);
			
		}
		//add drag values
		if(xx!=null)_rectX=xx;
		if(yy!=null)_rectY=yy;
		if(ww!=null)_rectWidth=ww;
		if(hh!=null)_rectHeight=hh;
		
		// callbacks
		oElem.element.dragBegin = new Function();
		oElem.element.drag = new Function();
		oElem.element.dragEnd = new Function();
		//
 		
		return oElem;
	}
 	
 	
	// private method. Begin drag process.
	this._dragBegin = function(e) {
		
		var oElem = _oElem = element;
 
		if (isNaN(parseInt(oElem.style.left))) { oElem.style.left = '0px'; }
		if (isNaN(parseInt(oElem.style.top))) { oElem.style.top = '0px'; }
 
		var x = parseInt(oElem.style.left);
		var y = parseInt(oElem.style.top);
		if(!_startX)
		{
		if(_rectX!=null) x=x;
		if(_rectY!=null) y=y;
 		_startX =x;
		_startY=y;
		}
		e = e ? e : window.event;
		oElem.mouseX = e.clientX;
		oElem.mouseY = e.clientY;
		oElem.dragBegin(oElem, x, y);
 		stage.addEventListener(MouseEvent.MOUSE_MOVE,_drag);
		stage.addEventListener(MouseEvent.MOUSE_UP,_dragEnd);
		//document.onmousemove = _drag;
		//document.onmouseup = _dragEnd;
		document.onmousedown = falsefunc;  
		return false;
	}
 	function falsefunc() { return false; } // used to block cascading events
 
	// private method. Drag (move) element.
	var _drag = function(e) {
		if(!pause)
		{
		var oElem =_oElem;
		var bro = new Browser();
		var x = parseInt(oElem.style.left);
		var y = parseInt(oElem.style.top);
 		var height = 0;
		if(bro.isIE())
		{
			height =parseInt(oElem.style.height);
		}
		//if rext x and y
		//if(_rectX) x = x + parseInt(_rectX);
		//if(_rectY) y = y + parseInt(_rectY);
		
		e = e ? e : window.event;
		var newX = x + (e.clientX - oElem.mouseX);
		var newY =y + (e.clientY - oElem.mouseY);
		if(_rectX !=null && _rectWidth !=null)
		{
			
			if(parseInt(newX)+parseInt(_rectX) >= parseInt(_rectX) && parseInt(newX)+parseInt(_rectX) <=parseInt(_rectX)+parseInt(_rectWidth))
			{
				newX + parseInt(_rectX);
				oElem.style.left = newX + 'px';
				oElem.mouseX = e.clientX;
			}
		}else{
			
			oElem.style.left = newX + 'px';
			oElem.mouseX = e.clientX;
		}
		
		if(_rectY !=null && _rectHeight !=null)
		{
			
			if(parseInt(newY)+parseInt(_rectY) >= parseInt(_rectY) && parseInt(newY)+parseInt(_rectY)+parseInt(height) <=parseInt(_rectY)+parseInt(_rectHeight))
			{
				newY + parseInt(_rectY);
				oElem.style.top = newY + 'px';
				oElem.mouseY = e.clientY;
			}
		
		}else{
			oElem.style.top = newY + 'px';
			oElem.mouseY = e.clientY;
		}
		oElem.drag(oElem, x, y);
		}
		return false;
	}
 
 
	// private method. Stop drag process.
	var _dragEnd = function() {
		var oElem = _oElem;
		var x=0;
		var y =0;
 		if(oElem)
		{
		 x = parseInt(oElem.style.left);
		 y = parseInt(oElem.style.top);
		 oElem.dragEnd(oElem, x, y);
		}
		
		 stage.removeEventListener(MouseEvent.MOUSE_MOVE,_drag);
		stage.removeEventListener(MouseEvent.MOUSE_UP,_dragEnd);
		//document.onmousemove = null;
		//document.onmouseup = null;
		document.onmousedown =null;
		_oElem = null;
	}
 	this.stopDrag=function()
	{
		_dragEnd();
	}
}
//

// import scripts
function IMPORT(value)
{
	
	importArray.push(value);
   
   //document.write('<scr'+'ipt type="text/javascript" src="'+value+'.js" ></scr'+'ipt>');

}
// style manager
function StyleManager()
{
	var public = StyleManager.prototype;
	public.events=[];
	var embedCompleted=0;
	var assetPrefix="asset-";
	var assetsHolder =new Array();
	var loadedAssets=false;
	 this.loadAssets=function()
	{
		
		for(var a=0;a<embedables.length;a++)
		{
			
			var image= new Image();
			image.src = embedables[a].src;
			assetsHolder[assetPrefix+embedables[a].name] = image;
			image.onload = ImageLoaded();
			
			
		}
	}
	this.addEventListener=function(event,callback)
	{ 
		if(event.name)event=event.name;
		if (event == Event.EMBEDS_LOADED.name && loadedAssets) 
		{
			
			callback(this);
		}else{
			addJS3Event(event,callback);
		}
	}
	this.removeEventListener=function(event,callback)
	{
		removeJS3Event(event,callback);
	}
	function ImageLoaded()
	{
		embedCompleted++;
		
		if(embedCompleted>=embedables.length)
		{
			loadedAssets=true;
			if (js3events && js3events[Event.EMBEDS_LOADED.name] ) 
			{
				JS3Dispatch(this,Event.EMBEDS_LOADED);
			}
			embedCompleted=0;
		}
	}
	this.getAssetByName=function(value)
	{
		return assetsHolder[assetPrefix+value];
	}
}
window.styleManager=new StyleManager();
//events
function addJS3Event(event,callback)
{
	
	if(event.name)event=event.name;
	js3events[event] = js3events[event] || [];
	if ( js3events[event] ) 
	{
		js3events[event].push(callback);
	}
}
function removeJS3Event(event,callback)
{
	if(event.name)event=event.name;
	if ( js3events[event] ) 
	{
		var listeners = js3events[event];
		for ( var i = listeners.length-1; i>=0; --i )
		{
			if ( listeners[i] === callback ) 
			{
				listeners.splice( i, 1 );
				return true;
			}
		}
	}
}
function JS3Dispatch(obj,event)
{
	if(event.name)event=event.name;
	if ( js3events[event] ) {
		var listeners = js3events[event], len = listeners.length;
		while ( len-- ) {
			
			listeners[len](obj);	//callback with self
		}		
	}
}

//on loadint scripts and assets
(function(window) 
{
	
	function dumpStage  ()
	{
		this.addEventListener=function(event,callback)
		{
			addJS3Event(event,callback);
		}
	}
	window.stage = new dumpStage();
	//load imports
	var importCompleted=0;
	var a=0;
	hasNext();
	function hasNext()
	{
		if(a<importArray.length)
		{
			loadScript(importArray[a]+'.js',ImportLoaded)
				// script.onload= ImportLoaded;
		}else{
			JS3Dispatch(stage,Event.STAGE_LOAD_COMPLETE);
			stage.addEventListener(Event.ON_STAGE_LOAD,stageinit);
			styleManager.loadAssets();
		}
	}
	function ImportLoaded(url)
	{
		
		importCompleted++;
		
		if(importCompleted>=importArray.length)
		{
			JS3Dispatch(stage,Event.STAGE_LOAD_COMPLETE);
			styleManager.loadAssets();
			stage.addEventListener(Event.ON_STAGE_LOAD,stageinit);
			dumpStage=null;
			importCompleted=0;
			
		}else{
			a++;
			hasNext();
		}
	}
	function loadScript(url, callback){

    var script = document.createElement("script")
    script.type = "text/javascript";

		if (script.readyState){  //IE
			script.onreadystatechange = function(){
				if (script.readyState == "loaded" ||
						script.readyState == "complete"){
					script.onreadystatechange = null;
					callback(url);
				}
			};
		} else {  //Others
			script.onload = function(){
				callback(url);
			};
		}
		 var head= document.getElementsByTagName('head')[0];
		script.src = url;
	   head.appendChild(script);
	}
	function stageinit()
	{
		document.body.style.margin = '0px';
  	  document.body.style.padding = '0px';
		 document.body.style.overflow = 'hidden';
   		document.getElementsByTagName('html')[0].style.margin = '0px';
   		document.getElementsByTagName('html')[0].style.padding = '0px';
		JS3Dispatch(stage,Event.ADDED_TO_STAGE);
	}
}(window));	