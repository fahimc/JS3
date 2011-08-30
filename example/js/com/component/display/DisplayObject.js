// imports
//document.write('<scr'+'ipt type="text/javascript" src="js/com/core/JS3.js" ></scr'+'ipt>'); // 
(function(window) {
		 
function DisplayObject() {}

	extend(DisplayObject, EventDispatcher);
	//DisplayObject.prototype = new EventDispatcher();

	// constructor:
  	var public =DisplayObject.prototype;
  	
	
	// public properties:
	public.element =document.createElement('div');
	public.element.style.position = "absolute";
	
	// private properties
	public.childrenContainer=[];
	
	
	// public methods:
	public.addChild = function(child) 
			{
				
				this.childrenContainer.push(child);
				if(child.element)
				{
					this.element.appendChild(child.element);
				}else{
					this.element.appendChild(child);
				}
			}
			public.dragging=false;
			public.addChildAt = function(child, index) 
			{
				
			}
			public.removeChild = function(child) 
			{
				
			}
			public.removeChildAt = function(index) 
			{
				
			}
			public.getChildAt = function(index) 
			{
				
			}
			public.getChildByName = function(name) 
			{
				
			}
			public.getChildIndex = function(child) 
			{
				
			}
			public.numChildren = function() 
			{
				return _childrenContainer.length;
			}
			public.setWidth =function(value)
			{
				 this.element.style.width = value+"px";
			}
			public.getWidth =function()
			{
				return this.element.style.width.split("px").join("") ;
			}
			public.setHeight =function(value)
			{
				 this.element.style.height = value+"px";
			}
			public.getHeight =function()
			{
		
				return this.element.style.height.split("px").join("") ;
			}
			/*public.addEventListener = function(eventName,functionName)
			{
				

				var b = new Browser();
				var elem = this.element;
				if(eventName.target!="parent")elem=eventName.target;
				
				
				
				if(b.isIE())
				{
					var ename = eventName.name;
					if(eventName.on)ename='on'+eventName.name;
					
					elem.attachEvent(ename,functionName);
				}else{
					
					elem.addEventListener(eventName.name,functionName,false);
				}
				b=null;
				
			}
			public.removeEventListener = function(eventName,functionName)
			{
				//trace(eventName);
				var b = new Browser();
				var elem = this.element;
				if(eventName.target!="parent")elem=eventName.target;
				
				if(b.isIE())
				{
					elem.detachEvent('on'+eventName.name,functionName);
				}else{
					
					elem.removeEventListener(eventName.name,functionName,false);
				}
				b=null;
				
			}*/
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
				
				var xx = (this.element.style.left).split("px");
				if(!xx[0])return 0;
				return  xx[0];
			}
			public.getY = function()
			{
				var yy = (this.element.style.top).split("px");
				return yy[0] ;
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
				public.element.style.position = "absolute";
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
			public.hideMouse = function()
			{
			  this.element.style.cursor = "none";
			}
	
window.DisplayObject = DisplayObject;
}(window));