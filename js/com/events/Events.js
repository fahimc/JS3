
// create new events.
window.newEvent = function(eventName,trigger,targ)
{
	
	if(!targ)targ = document.body;
	if(!trigger)trigger=eventType;
	
	window[eventName] = 
	{
		name:trigger,
		target:targ
	}
}
// keyboard events
window.KeyboardEvent =
	{
		KEY_DOWN:{name:"keydown",target:"parent"},
		KEY_PRESS:{name:"keypress",target:"parent"},
		KEY_UP:{name:"keyup",target:"parent"}
	
	};
// mouseEvents
window.MouseEvent = 
	{
		CLICK:{name:"click",target:"parent"},
		MOUSE_OUT:{name:"mouseout",target:"parent"},
		MOUSE_OVER:{name:"mouseover",target:"parent"},
		MOUSE_MOVE:{name:"mousemove",target:document},
		MOUSE_DOWN:{name:"mousedown",target:"parent"},
		MOUSE_UP:{name:"mouseup",target:"parent"}
	};
// standard events
window.Event =
{
	RESIZE:{name:"resize",target:window},
	ADDED_TO_STAGE:{name:"load",target:window},
	ON_COMPLETE:{name:"ON_COMPLETE",target:window}
};


// event dispatcher
window.dispatchEvent=function(eventName,bubbles,cancelable,target)
{
	
	var fireOnThis =document.body;
	if(target)fireOnThis=target;
	if( document.createEvent ) {
		
		var evObj = document.createEvent("Events");	
		evObj.initEvent( eventName.name, bubbles, cancelable )
		fireOnThis.dispatchEvent(evObj);
	} else if( document.createEventObject ) {
  		fireOnThis.fireEvent(eventName.name);
	}
}