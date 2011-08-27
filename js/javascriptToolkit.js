
///////////////////////////////////  JS3 //////////////////////////////////////////////////////////////////////////////////////////////////
// Constructor
//global variable
var extendables={subClass:new Array(),baseClass:[]}

///events
var Event =(function () 
{
	return {
	RESIZE:"RESIZE"
	}
})();
var MouseEvent =(function () 
{
	return {
	CLICK:"click",
	MOUSE_OUT:"mouseout",
	MOUSE_OVER:"mouseover"
	}
})();
var KeyboardEvent =
{
	KEY_DOWN:"keydown",
	KEY_PRESS:"keypress",
	KEY_UP:"keyup"

}
/// stage
var Stage =
{
	
	stageWidth: function()
	 {
		 var viewportwidth;
			 if (typeof window.innerWidth != 'undefined')
	 		{
		  		viewportwidth = window.innerWidth;
			} else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth !='undefined' && document.documentElement.   clientWidth != 0)
	 		{
		   		viewportwidth = document.documentElement.clientWidth;
			}else
			{
		  		viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
			}
			return viewportwidth;
	 },
	 stageHieght: function()
	 {
		  var viewportheight;
			 if (typeof window.innerWidth != 'undefined')
	 		{
		  		viewportheight = window.innerHeight;
			} else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth !='undefined' && document.documentElement.   clientWidth != 0)
	 		{
		   		viewportheight = document.documentElement.clientHeight;
			}else
			{
		  		viewportheight = document.getElementsByTagName('body')[0].clientHeight;
			}
			return viewportheight;
	 }
}
///Classes 	

/// UIELement

///---create inherentace 
///-------
function UIElement()
{
	UIElement.prototype.div;
	UIElement.prototype.name ="";
	UIElement.prototype.styleName="";
	var _childrenContainer=[];
		 	UIElement.prototype.addChild = function(child) 
			{
				_childrenContainer.push(child);
				this.div.appendChild(child.div);
			}
			UIElement.prototype.addChildAt = function(child, index) 
			{
				
			}
			UIElement.prototype.removeChild = function(child) 
			{
				
			}
			UIElement.prototype.removeChildAt = function(index) 
			{
				
			}
			UIElement.prototype.getChildAt = function(index) 
			{
				
			}
			UIElement.prototype.getChildByName = function(name) 
			{
				
			}
			UIElement.prototype.getChildIndex = function(child) 
			{
				
			}
			UIElement.prototype.numChildren = function() 
			{
				return _childrenContainer.length;
			}
			UIElement.prototype.build = function() 
			{
			  this.div = document.createElement('div');
			  this.div.setAttribute('id',this.name);
			
			  //this.div.innerHTML  = "hello world";
			 // trace("build");
			}
			UIElement.prototype.setStyle = function() 
			{
				 this.div.setAttribute("class",this.styleName);
				 this.setDefaultStyle();
				 
			}
			UIElement.prototype.arrange = function() 
			{
				
			}
			UIElement.prototype.purge = function() 
			{
				
			}
			UIElement.prototype.setWidth =function(value)
			{
				 this.div.style.width = value+"px";
			}
			UIElement.prototype.getWidth =function()
			{
				return this.div.style.width ;
			}
			UIElement.prototype.setHeight =function(value)
			{
				 this.div.style.height = value+"px";
			}
			UIElement.prototype.getHeight =function()
			{
				return this.div.style.height ;
			}
			UIElement.prototype.addEventListener = function(eventName,functionName)
			{
				
				if(Browser.isIE())
				{
					this.div.attachEvent('on'+eventName,functionName);
				}else{
					
					this.div.addEventListener(eventName,functionName,false);
				}
				
			}
			UIElement.prototype.buttonMode = function(boolean)
			{
				if(boolean)
				{
					this.div.style.cursor="pointer";
				}else{
					this.div.style.cursor="default";
				}
			}
			UIElement.prototype.setDefaultStyle = function()
			{
				this.div.style.position = "absolute";
			}
			UIElement.prototype.x = function(value)
			{
				this.div.style.left = (value+findPosX(this.div))+"px";
			}
			UIElement.prototype.y = function(value)
			{
				this.div.style.top = (value+findPosY(this.div))+"px";
			}
			UIElement.prototype.text =function(value)
			{
				var oNewP = document.createElement("p");
     		    var oText = document.createTextNode(value);
                oNewP.appendChild(oText);
                this.div.appendChild(oNewP);
			}
			UIElement.prototype.alpha =function(value) 
			{
				this.div.style.opacity = value/10;
				this.div.style.filter = 'alpha(opacity=' + value*10 + ')';
			}
			UIElement.prototype.visible = function(value)
			{
				if(value==true)
				{
					this.div.style.visibility="visible";
				}else if(value==false){
					this.div.style.visibility="hidden";
				}
			}
}

function TextField ()
{
	extend(TextField,UIElement);
	TextField.prototype.build = function() 
	{
	  this.div = document.createElement('input');
	  this.div.setAttribute('id',this.name);
	 // trace("build");
	}
	TextField.prototype.text =function(value)
	{
		 this.div.value=value;
	}
	
}
extendables.subClass.push(TextField);
/// Global functions //////////////////////
function addChild(child)
{
	document.body.appendChild(child.div);	
	 
}
function trace ()
{
	var toSend="";
	for(var i in arguments) {
		toSend+=arguments[i]+",";
	}
	alert(toSend);
}
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
function extendSubClasses()
{
	for(var a=0; a< extendables.subClass.length;a++)
	{		
		var subc = extendables.subClass[a];
		subc();
		subc=null;
	}
		/* function inheritance() {}
   inheritance.prototype = extendables.baseClass[a].prototype;

   extendables.subClass[a].prototype = new inheritance();
    extendables.subClass[a].prototype.constructor =  extendables.subClass[a];
    extendables.subClass[a].baseConstructor = extendables.baseClass[a];
    extendables.subClass[a].superClass = extendables.baseClass[a].prototype;
	}
	 
	 */
	 extendables=null;
}
///browser detection
var Browser = 
{
  isIE: function() 
  {
	  var boolean=false;
	   if (navigator.appVersion.indexOf("MSIE") != -1)boolean=true;
	   return boolean;
  }
}
//// find relative x position
function findPosX(obj)
  {
    var curleft = 0;
    if(obj.offsetParent)
        while(1) 
        {
          curleft += obj.offsetLeft;
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
          curtop += obj.offsetTop;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
    else if(obj.y)
        curtop += obj.y;
    return curtop;
  }
// onresize handler
window.onload = frameworkInit();

function frameworkInit()
{
	

	extendSubClasses();
}