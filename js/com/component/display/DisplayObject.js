// imports
//document.write('<scr'+'ipt type="text/javascript" src="js/com/core/JS3.js" ></scr'+'ipt>'); // 
(function(window) {
		 
function DisplayObject() {
	this.init();
	}

	extend(DisplayObject, EventDispatcher);
	//DisplayObject.prototype = new EventDispatcher();

	// constructor:
  	var public =DisplayObject.prototype;
  	
	
	// public properties:
	public.element =document.createElement('div');

	public.element.style.position = "absolute";
	public.scrollbar=null;
	public.scrollhandle=null;
	public.deg2radians = Math.PI * 2 / 360;
	public.elementRotation=0;
	public.childrenContainer;
	public.UIChildrenContainer;
	public.childHolder;
	public.dragging=false;
	public.isScrollable=false;
	// private properties
	public.init=function()
	{
		this.UIChildrenContainer= new Array();
		this.element =document.createElement('div');
		this.childHolder = document.createElement('div');
		this.element.appendChild(this.childHolder);
	}
	
	// public methods:
	       public.addChild = function(child) 
			{
				if(!this.childrenContainer)
				{
					this.childrenContainer = new Array();
				}
				this.childrenContainer.push(child);
				if(child.element)
				{
					if(this.childHolder)
					{
						this.childHolder.appendChild(child.element);
					}else{
						this.element.appendChild(child.element);
					}
				}else{
					if(this.childHolder)
					{
						this.childHolder.appendChild(child);
					}else{
						this.element.appendChild(child);
					}
				}
			}
			 public.addUIChild = function(child) 
			{
				this.UIChildrenContainer.push(child);
				if(child.element)
					{
						this.element.appendChild(child.element);
						
					}else{
						this.element.appendChild(child);
					}
			}
			public.addChildAt = function(child, index) 
			{
				
			}
			public.removeChild = function(child) 
			{
				if(this.childrenContainer)
				{
					for(var a=0;a<this.childrenContainer.length;a++)
					{
						if(this.childrenContainer[a] ==child)
						{
							
							this.childrenContainer.splice(a,1);
							a=this.childrenContainer.length+1;
						}
					}
				}
				if(child.element)
				{
					if(this.childHolder)
					{
						this.childHolder.removeChild(child.element);
					}else{
						this.element.removeChild(child.element);
					}
				}else{
					if(this.childHolder)
					{
						this.childHolder.removeChild(child);
					}else{
						this.element.removeChild(child);
					}
				}
			}
			 public.removeUIChild = function(child) 
			{
				
				if(this.UIChildrenContainer)
				{
					for(var a=0;a<this.UIChildrenContainer.length;a++)
					{
						if(this.UIChildrenContainer[a] ==child)
						{
							
							this.UIChildrenContainer.splice(a,1);
							a=this.UIChildrenContainer.length+1;
						}
					}
				}
				if(child.element)
				{
					this.element.removeChild(child.element);
				}else{
					this.element.removeChild(child);
				}
			}
			public.contains = function(child) 
			{
				if(this.childrenContainer)
				{
					for(var a=0;a<this.childrenContainer.length;a++)
					{
						if(this.childrenContainer[a] ==child)
						{
							return true;
						}
					}
				}
				return false;
			}
			public.UIContains = function(child) 
			{
				
				if(this.UIChildrenContainer)
				{
					for(var a=0;a<this.UIChildrenContainer.length;a++)
					{
						
						if(this.UIChildrenContainer[a] ==child)
						{
							return true;
						}
					}
				}
				
				return false;
			}
			public.removeChildAt = function(index) 
			{
				
				this.removeChild(this.childrenContainer[index]);
			}
			public.getChildAt = function(index) 
			{
				return this.childrenContainer[index];
			}
			public.getChildByName = function(name) 
			{
				
			}
			public.getChildIndex = function(child) 
			{
				
			}
			public.numChildren = function() 
			{
				if(this.childrenContainer)
				{
					return this.childrenContainer.length;
				}else{
					return 0;
				}
			}
			public.setWidth =function(value)
			{
				 this.element.style.width = value+"px";
				 if(this.childHolder)
				{
				 this.childHolder.style.width = value+"px";
				}
			}
			public.getWidth =function()
			{
				if(this.getStyleValue("width")!=parseInt(this.getStyleValue("width")))
				{
					return 0;
				}
				return this.getStyleValue("width");
				//return this.element.style.width.split("px").join("") ;
			}
			public.setHeight =function(value)
			{
				
				 this.element.style.height = value+"px";
				 if(this.childHolder)
				{
				 this.childHolder.style.height = value+"px";
				 this.scrollable(); 
				}
				
				
			}
			public.getHeight =function()
			{
				// if auto offsetHeight
				
				if(this.getStyleValue("height")!=parseInt(this.getStyleValue("height")))
				{
		
						return 0;
				}
				return this.getStyleValue("height");
				//return this.element.style.height.split("px").join("") ;
			}
			
			public.buttonMode = function(boolean)
			{
				if(boolean)
				{
					this.element.style.cursor="pointer";
				}else{
					this.element.style.cursor="default";
				}
			}
			public.offsetLeft = function(value)
			{
				return this.element.offsetLeft;
			}
			public.x = function(value)
			{
				
				//this.element.style.left = (value+findPosX(this.element))+"px";
				this.element.style.left = (value)+"px";
				
			}
			public.y = function(value)
			{
				//this.element.style.top = (value+findPosY(this.element))+"px";
				this.element.style.top = (value)+"px";
			}
			public.getX = function()
			{
				
				var xx =  this.getStyleValue("left");
				if(!parseInt(xx))return 0;
				return  xx;
			}
			public.getY = function()
			{
				var yy =  this.getStyleValue("top");
				if(!parseInt(yy))return 0;
				return yy ;
			}
			public.alpha =function(value) 
			{
				value = value *100;
				this.element.style['opacity'] = value /100 ;
				
				this.element.style['-moz-opacity'] = value / 100;
				
				this.element.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity="+value+")";
				
				if(this.element.style.filters ) this.element.filters.alpha['opacity'] =  value;
			}
			public.visible = function(value)
			{
				if(value==true)
				{
					this.element.style.visibility="visible";
				}else if(value==false){
					this.element.style.visibility="hidden";
				}
			}
			public.setDefaultStyle = function()
			{
				this.element.style.position = "absolute";
				this.element.style.padding="0px";
				this.element.style.margin="0px";
				this.element.style.overflow="hidden"; 
				if(this.childHolder)
				{
					
				this.childHolder.style.position = "absolute";
				this.childHolder.style.padding="0px";
				this.childHolder.style.margin="0px";	
				this.childHolder.style.overflow="hidden"; 
				}
			}
			public.startDrag= function(w,h,xx,yy)
			{
					var obj = this;
					var mx;
					var my;
					var marX=xx;
					var marY=yy;
					if(!this.dragging)
					{
					this.dragging=true;
						if(!window.captureEvents) document.onmousemove=getMousePos
						if (window.captureEvents) {
						window.captureEvents(Event.MOUSEMOVE)
						window.onmousemove=getMousePos //e should not be defined
						}
					}
					
					function getMousePos(e)
					{
						
						if( window.event && window.event.clientX)
						{
							mx = window.event.clientX;
							my = window.event.clientY;
						}else  {
							mx = e.pageX;
							my = e.pageY;
						}
						// if padding left
						if(marX)
						{
							mx=mx-marX;
						}
						// if padding top
						if(marY)
						{
							my=my-marY;
						}
						if(w && parseInt(obj.getX())+window.event.clientX < w)
						{
							obj.x(mx); 
						}else if(!w){
							obj.x(mx); 
						}
						if(h && parseInt(obj.getY())+window.event.clientY < h)
						{
							obj.y(my);
						}else if(!h){
							obj.y(my);
						}
					
					}

				
			}
			public.stopDrag=function()
			{
				if(!window.captureEvents) document.onmousemove=null;
						if (window.captureEvents) {
						window.captureEvents(Event.MOUSEMOVE)
						window.onmousemove=null; //e should not be defined
						}
						this.dragging=false;
			}
			public.onDragDown =function()
			{
				this.removeEventListener(MouseEvent.MOUSE_DOWN,this.onDragDown);
			}
			public.hitTestObject =function(value)
			{
				//var hitTest =false;
				if(parseInt(this.getX())>parseInt(value.getX()) && 
				parseInt(this.getX()) < parseInt(value.getX())+parseInt(value.getWidth()))
				{
					//hitTest=true
				}else{
					//hitTest=false;
					return false;
				}
				if(parseInt(this.getY())>parseInt(value.getY()) && 
				parseInt(this.getY()) < parseInt(value.getY())+parseInt(value.getHeight()))
				{
					//hitTest=true;
				}else{
					//hitTest=false;
					return false;
				}
				return true;
				
			}
			public.hitTestPoint =function(xx,yy)
			{
				//var hitTest =false;
				if(parseInt(this.getX())==parseInt(xx) && parseInt(this.getY())==parseInt(yy))
				{
					return true;
				}
					return false;		
			}
			public.hideMouse = function()
			{
			  this.element.style.cursor = "none";
			}
			public.clone = function(obj)
			{
				this.element =   obj.element.cloneNode(true);
			}
			public.rotation = function(value)
			{
				this.elementRotation=value;
				this.element.style.transform="rotate("+value+"deg)";
				this.element.style.webkitTransform = "rotate("+value+"deg)";
				this.element.style['-ms-transform'] = "rotate("+value+"deg)";
				this.element.style.MozTransform = "rotate("+value+"deg)";
				 
				this.element.style.filter ="progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand')";
				this.fnSetRotation(value);
			}
			public.fnSetRotation =function( deg)
			
			{
				
			    var rad = deg * this.deg2radians ;
				var costheta = Math.cos(rad);
				var sintheta = Math.sin(rad);
				this.element.filters.item(0).M11 = costheta;
				this.element.filters.item(0).M12 = -sintheta;
				this.element.filters.item(0).M21 = sintheta;
				this.element.filters.item(0).M22 = costheta;
			    rad =null;
			    costheta =null;
			    sintheta=null;
			} 
			public.getRotation =function()
			{
				return this.elementRotation;
			}
			public.getStyleValue=function(value)
			{
				var isStyle;
				if ( this.element.currentStyle && this.element.currentStyle[value]) 
				{
					isStyle =  this.element.currentStyle[value];
				}
				 else if ( document.defaultView.getComputedStyle && document.defaultView.getComputedStyle( this.element).getPropertyValue(value))
				{
					isStyle = document.defaultView.getComputedStyle( this.element).getPropertyValue(value);
				}else{
					isStyle =   this.element.style[value];
				
				}
				if(!isStyle)return null;
				return isStyle.split("px").join("");				
			}
			public.addStyleName=function(value)
			{
				 this.element.setAttribute("class",value);
				 if(this.childHolder)
				{
				 this.childHolder.setAttribute("class",value);
				}
			}
			public.scrollable=function(value)
			{
				
				
				if(this.childHolder.scrollHeight>this.getHeight())
				{

					this.childHolder.style.overflow="hidden"; 
					
					if(!this.scrollbar)
					{
						
						this.scrollbar = new DisplayObject();
						this.scrollbar.addStyleName('scrollbar');
						
					}
					
					if(!this.scrollhandle)
					{
						
						this.scrollhandle = new DisplayObject();
						this.scrollhandle.addStyleName('scrollhandle');	
						
					}
					
					this.setScrollbar();
					
					
					
				}else if(this.scrollbar){
					
					this.setScrollbar(false);
					//this.scrollhandle.setHeight(this.element.scrollHeight-this.getHeight());
				}
				
			}
			public.setScrollbar=function(value)
				{
					if(value!=false)
					{
					this.scrollbar.x(parseInt(this.getWidth()));
					this.scrollbar.y(0);
					this.scrollbar.setHeight(this.getHeight());
					var ratio = this.getHeight()/this.childHolder.scrollHeight;
					//trace(this.scrollbar.getHeight() * ratio);
					this.scrollhandle.x((this.scrollbar.getWidth() * 0.5)-(this.scrollhandle.getWidth() * 0.5));
						this.scrollhandle.y(0);
						this.scrollhandle.buttonMode(true);
					this.scrollhandle.setHeight(this.scrollbar.getHeight() * ratio);	
					var sb = this.scrollbar;
					var sh = this.scrollhandle;
					var mouseX;
					var mouseY;
					var graby;
					var eley;
					var oriy;
					var startX;
					var startY;
					var obj = this;
					var isScrolling=false;
					
					if(!this.UIContains(this.scrollbar))
					{
						
					this.scrollhandle.addEventListener(MouseEvent.MOUSE_DOWN,onScrollMouseDown);
					stage.addEventListener(MouseEvent.MOUSE_MOVE,mouseUpDate);
					// document.onmousemove =mosueUpDate;
					  this.addEventListener(MouseEvent.MOUSE_WHEEL, onWheelScrollMouse);  
					  this.addEventListener(TouchEvent.TOUCH_START,onTouch);
		    		   this.addEventListener(TouchEvent.TOUCH_MOVE,onTouchMove);
					  
					   this.scrollbar.addChild(this.scrollhandle);
					   this.addUIChild(this.scrollbar.element);
					   
					}else{
						
					}
					this.scrollbar.visible(true);
					this.scrollhandle.visible(true);
					 mouseUpDate();
					 
					}else{
						//document.onmousedown = null;  
						//document.onmousemove =null;
						//document.onmouseup=null;
						stage.removeEventListener(MouseEvent.MOUSE_MOVE,mouseUpDate)
						stage.removeEventListener(MouseEvent.MOUSE_MOVE,onHandleMove);
						this.removeEventListener(MouseEvent.MOUSE_WHEEL, onWheelScrollMouse);  
						 this.removeEventListener(MouseEvent.MOUSE_UP,onScrollMouseUp);
						if(this.scrollbar.contains(this.scrollhandle))
						{
						this.scrollhandle.removeEventListener(MouseEvent.MOUSE_DOWN,onScrollMouseDown);
						this.scrollbar.removeChild(this.scrollhandle);
						}
						if(this.UIContains(this.scrollbar))
						{
						this.removeUIChild(this.scrollbar.element);
						}
						this.isScrollable=false;
						this.scrollbar.visible(false);
						this.scrollhandle.visible(false);
						//this.scrollbar=null;
						//this.scrollhandle=null;
					
					}
					function onTouch(event)
					{
						 if( event.touches)
						{
							
							var touch = event.touches[0];
							startX =touch.pageX;
							graby =touch.pageY-parseInt(sh.getY());
							eley = oriy = sh.element.offsetTop;
						}
					}
					function onTouchMove(e)
					{
						eley = oriy + (mouseY-graby);
						if(eley >= 0 && eley <= parseInt(sb.getHeight())-parseInt(sh.getHeight()))
						 {
						 sh.y(eley);
						 ratio = sh.getY()/sb.getHeight();
						 obj.childHolder.scrollTop=ratio * obj.childHolder.scrollHeight;
						 }
						var touch = event.touches[0];
						mouseY = parseInt(touch.pageY)-parseInt(sh.getY());
					}
					function onWheelScrollMouse(e)
					{
						
						e = e ? e : window.event;
  						var wheelData = e.detail ? e.detail : e.wheelDelta;
						 obj.childHolder.scrollTop-=wheelData;
						 ratio =  obj.childHolder.scrollTop/obj.childHolder.scrollHeight;
						 
							sh.y(sb.getHeight() * ratio);
					}
					function mouseUpDate(e)
					{
						mouseY = parseInt(stage.mouseY(e))-parseInt(sh.getY());
					}
					function onScrollMouseDown(e)
					{
						
						document.onmousedown = falsefunc;  
						sh.removeEventListener(MouseEvent.MOUSE_DOWN,onScrollMouseDown);
						stage.removeEventListener(MouseEvent.MOUSE_MOVE,mouseUpDate);
						stage.addEventListener(MouseEvent.MOUSE_MOVE,onHandleMove);
						 //document.onmousemove =onHandleMove;
						 stage.addEventListener(MouseEvent.MOUSE_UP,onScrollMouseUp);
						// document.onmouseup=onScrollMouseUp;
						
						graby = mouseY;
						sh.childHolder.zIndex = 0;
						eley = oriy = sh.element.offsetTop;
						 return false;
						//trace("drag",sh);
						//sh.startDrag(20,sb.getHeight(),0,0);
					}
					function onHandleMove(e)
					{
						
						 eley = oriy + (mouseY-graby);
						 if(eley >= 0 && eley <= parseInt(sb.getHeight())-parseInt(sh.getHeight()))
						 {
						 sh.y(eley);
						 ratio = sh.getY()/sb.getHeight();
						 obj.childHolder.scrollTop=ratio * obj.childHolder.scrollHeight;
						 }
						 mouseUpDate(e);
  						 return false;
					}
					function onScrollMouseUp(e)
					{
						sh.childHolder.zIndex = 0;
						stage.removeEventListener(MouseEvent.MOUSE_MOVE,onHandleMove);
						stage.addEventListener(MouseEvent.MOUSE_MOVE,mouseUpDate);
						//document.onmousemove = mosueUpDate;
  						//document.onmouseup = null;
  						//document.onmousedown = null;  
						sh.addEventListener(MouseEvent.MOUSE_DOWN,onScrollMouseDown);
					}
					function falsefunc() { return false; } // used to block cascading events
					public.purge = function()
					{
						if(this.scrollbar)
						{
							
						document.onmousedown = null;  
						document.onmousemove =null;
						document.onmouseup=null;
						stage.removeEventListener(MouseEvent.MOUSE_MOVE,mouseUpDate);
						this.scrollhandle.removeEventListener(MouseEvent.MOUSE_DOWN,onScrollMouseDown);
						this.removeEventListener(MouseEvent.MOUSE_WHEEL, onWheelScrollMouse);  
						
							this.scrollbar.removeChild(this.scrollhandle);
							this.removeUIChild(this.scrollbar.element);
						
						this.isScrollable=false;
						//this.scrollbar=null;
						//this.scrollhandle=null;
						}
					}
				}
			
window.DisplayObject = DisplayObject;
}(window));