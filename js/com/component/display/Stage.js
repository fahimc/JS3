(function(window) {
function Stage()
	{}
		extend(Stage,DisplayObject);
		var public = Stage.prototype;
		public.frameRate=31;
		public.isMobile=false;
		this.element = document.body;
		public.stageWidth = function()
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
		 }
		 public.stageHeight =function()
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
				if(console.debugging)viewportheight=viewportheight-console.getHeight();
				return viewportheight;
		 }
		 public.addChild = function(child) 
	{
		
		
		if(child.element)
		{
			
			document.body.appendChild(child.element);
		}else{
			document.body.appendChild(child);
		}
	}
	public.removeChild = function(child) 
			{
				for(var a=0;a<childrenContainer.length;a++)
				{
					if(childrenContainer[a] ==child)
					{
						childrenContainer.splice(a,1);
						a=childrenContainer.length+1;
					}
				}
				
				if(child.element)
				{
					document.body.removeChild(child.element);
				}else{
					document.body.removeChild(child);
				}
			}
	public.mouseY = function(e)
	{
		
		if (!e) e = window.event; // works on IE, but not NS (we rely on NS passing us the event)

		  if (e)
		  { 
			if (e.pageX || e.pageY)
			{ // this doesn't work on IE6!! (works on FF,Moz,Opera7)
			 // mousex = e.pageX;
			 
			  return e.pageY;
			 // algor = '[e.pageX]';
			 // if (e.clientX || e.clientY) algor += ' [e.clientX] '
			}
			else if (e.clientX || e.clientY)
			{ // works on IE6,FF,Moz,Opera7
			  //mousex = e.clientX + document.body.scrollLeft;
			 
			  return e.clientY+ document.body.scrollTop;
			 // algor = '[e.clientX]';
			 // if (e.pageX || e.pageY) algor += ' [e.pageX] '
			}  
		  }
	}
	public.mouseX = function(e)
	{
		
		if (!e) e = window.event; // works on IE, but not NS (we rely on NS passing us the event)

		  if (e)
		  { 
			if (e.pageX || e.pageY)
			{ // this doesn't work on IE6!! (works on FF,Moz,Opera7)
			 // mousex = e.pageX;
			 
			  return e.pageX;
			 // algor = '[e.pageX]';
			 // if (e.clientX || e.clientY) algor += ' [e.clientX] '
			}
			else if (e.clientX || e.clientY)
			{ // works on IE6,FF,Moz,Opera7
			  //mousex = e.clientX + document.body.scrollLeft;
			 
			  return e.clientX+ document.body.scrollLeft;
			 // algor = '[e.clientX]';
			 // if (e.pageX || e.pageY) algor += ' [e.pageX] '
			}  
		  }
	}
	
	
// debugger
function JSDebugger(){}
	extend(JSDebugger,DisplayObject);
	
	var public = JSDebugger.prototype;
	public.debugging=false;
	public.debug =function(boolean)
	{
		
		if(boolean==false)
		{
			this.debugging=false;
		}else{
			this.debugging=true;
			this.name="console"
			this.element = document.createElement('div');
			this.element.setAttribute('id',this.name);	
			this.element.style.overflow = "auto";
			this.element.style.position = "absolute";
			this.setWidth(stage.stageWidth());
		
			this.setHeight(300);
		
			addChild(this);
			this.y(stage.stageHeight());
			this.message("--CONSOLE WINDOW--");
		}
	}
	public.message=function(value)
	{
		var p = document.createElement('p');
		p.style.marginLeft="10px";
		p.style.color="#000";
		p.innerHTML=value;
		this.element.appendChild(p);
		 p=null;
	}
	public.mobileMode = function(value)
	{
		this.isMobile=value;
	}
	
	 
window.console= new JSDebugger();
window.stage = new Stage();


function frameworkinit()
{
	document.body.style.margin = '0px';
    document.body.style.padding = '0px';
	 document.body.style.overflow = 'hidden';
   document.getElementsByTagName('html')[0].style.margin = '0px';
   document.getElementsByTagName('html')[0].style.padding = '0px';
   stage.removeEventListener(Event.ADDED_TO_STAGE,frameworkinit);
}
}(window));	