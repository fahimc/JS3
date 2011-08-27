// imports
//document.write('<scr'+'ipt type="text/javascript" src="js/com/core/JS3.js" ></scr'+'ipt>'); // 
(function(window) {
		 
function DisplayObject() {}
		

	// constructor:
  	var public = DisplayObject.prototype;
  	
	
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
			public.addEventListener = function(eventName,functionName)
			{
				
				
				var b = new Browser();
				var elem = this.element;
				if(eventName.target!="parent")elem=eventName.target;
				
				
				
				if(b.isIE())
				{
					elem.attachEvent('on'+eventName.name,functionName);
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
				var xx = (this.element.style.left).split("px");
				return  xx[0];
			}
			public.getY = function()
			{
				var yy = (this.element.style.top).split("px");
				return yy[0] ;
			}
			public.alpha =function(value) 
			{
				this.element.style.opacity = value/10;
				this.element.style.filter = 'alpha(opacity=' + value*10 + ')';
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
			public.startDrag= function()
			{
				this.addEventListener(MouseEvent.MOUSE_MOVE,this.onDrag);
				//this.addEventListener(MouseEvent.MOUSE_DOWN,onDragDown);
				this.addEventListener(MouseEvent.MOUSE_UP,this.onDragUp);
				
			}
			public.onDragDown =function()
			{
				
				
				this.removeEventListener(MouseEvent.MOUSE_DOWN,this.onDragDown);
			}
			public.onDragUp =function()
			{
				
				this.removeEventListener(MouseEvent.MOUSE_MOVE,this.onDrag);
			}
			public.onDrag = function(e)
			{
				//trace((window.event.clientX)+"px");
				public.x(window.event.clientX);
				//trace("drag",);
				// this is the actual "drag code"
				//x(this.getX()+ window.event.clientX); 
				//y(window.event.clientY );
			}
	
window.DisplayObject = DisplayObject;
}(window));