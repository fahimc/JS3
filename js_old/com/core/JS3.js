// imports
window.onload = frameworkInit();

//global variable
var extendables={subClass:new Array(),baseClass:[]}


	/// stage

// addchild
function addChild(child)
{
	
	document.body.appendChild(child.element);	
	 
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
/*function extendSubClasses()
{
	for(var a=0; a< extendables.subClass.length;a++)
	{		
		var subc = extendables.subClass[a];
		subc();
		subc=null;
	}
	 extendables=null;
}*/
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

// init framework
function frameworkInit()
{
	
	
	//extendSubClasses();
	
	
	
}
