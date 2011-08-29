
(function(window) {
function EventDispatcher(){}
var public = EventDispatcher.prototype;
public.events=[];
public.addEventListener=function(event,callback){
	var check = this.checkEvent(event);
	if(!check)
	{
		this.events[event] = this.events[event] || [];
		if ( this.events[event] ) {
			this.events[event].push(callback);
		}
	}else{
		this.addStandardEventListener(this,event,callback);
	}
	check =null;
}

public.removeEventListener=function(event,callback){
	var check = this.checkEvent(event);
	if(!check)
	{
	if ( this.events[event] ) {
		var listeners = this.events[event];
		for ( var i = listeners.length-1; i>=0; --i ){
			if ( listeners[i] === callback ) {
				listeners.splice( i, 1 );
				return true;
			}
		}
	}
	return false;
	}else{
		this.removeStandardEventListener(this,event,callback);
	}
}
public.checkEvent = function (event)
{
	
	if(this.checkObjects(event,MouseEvent))return true;
	if(this.checkObjects(event,KeyboardEvent))return true;
	if(this.checkObjects(event,Event))return true;
	
	///for(var key in MouseEvent)
	//{
	//	 var obj = MouseEvent[key];
   	//	if(obj ==event)
	//	{
	//		return true;
	//	}
		/*for (var prop in obj) 
		{
			if(prop=="name")
			{
				trace( obj[prop], event.name);
				if( obj[prop] == event) return true;
     		 	
			}
		}*/	
	//}
	/*for(var ev in KeyboardEvent)
	{
		if(ev == event) return true;
	}
	for(var ev in Event)
	{
		if(ev == event) return true;
	}*/
	return false;
}
public.checkObjects=function(e,type)
{
	for(var key in type)
	{
		 var obj = type[key];
   		if(obj ==e)
		{
			return true;
		}
	}
}
public.addStandardEventListener = function(obj,eventName,functionName)
			{
				

				var b = new Browser();
				var elem = obj.element;
				
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
public.removeStandardEventListener = function(obj,eventName,functionName)
{
	//trace(eventName);
	var b = new Browser();
	var elem = obj.element;
	if(eventName.target!="parent")elem=eventName.target;
	
	if(b.isIE())
	{
		elem.detachEvent('on'+eventName.name,functionName);
	}else{
		
		elem.removeEventListener(eventName.name,functionName,false);
	}
	b=null;
	
}
public.dispatch=function(event){
	//trace(event);
	if ( this.events[event] ) {
		var listeners = this.events[event], len = listeners.length;
		while ( len-- ) {
			
			listeners[len](this);	//callback with self
		}		
	}
}

 window.EventDispatcher = EventDispatcher;
}(window));	