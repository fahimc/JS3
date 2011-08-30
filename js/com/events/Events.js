
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
		KEY_DOWN:{name:"keydown",target:"parent",on:true},
		KEY_PRESS:{name:"keypress",target:"parent",on:true},
		KEY_UP:{name:"keyup",target:"parent",on:true}
	
	};
// mouseEvents
window.MouseEvent = 
	{
		CLICK:{name:"click",target:"parent",on:true},
		MOUSE_OUT:{name:"mouseout",target:"parent",on:true},
		MOUSE_OVER:{name:"mouseover",target:"parent",on:true},
		MOUSE_MOVE:{name:"mousemove",target:document,on:true},
		MOUSE_DOWN:{name:"mousedown",target:"parent",on:true},
		MOUSE_UP:{name:"mouseup",target:"parent",on:true}
	};
// touch events
window.TouchEvent = 
	{
		TOUCH_END:{name:"touchend ",target:document,on:false},
		TOUCH_MOVE:{name:"touchmove ",target:document,on:false},
		TOUCH_START:{name:"ontouchstart",target:document,on:false}
	};

// standard events
window.Event =
{
	RESIZE:{name:"resize",target:window,on:true},
	ADDED_TO_STAGE:{name:"load",target:window,on:true},
	ON_COMPLETE:{name:"ON_COMPLETE",target:window}
};


// event dispatcher
/*window.dispatchEvent=function(eventName,bubbles,cancelable,target)
{

	var fireOnThis =document.body;
	if(target)fireOnThis=target;
	
	 if ( document.createEvent) {     // all browsers except IE before version 9
		
		var evObj = document.createEvent ("Events");
		evObj.initEvent (eventName.name, true, true);
		fireOnThis.dispatchEvent (evObj);
		
	} else if (document.createEventObject)
	 {   // IE before version 9
			
			var evObj = document.createEventObject ();
			fireOnThis.fireEvent (eventName.name, evObj);
	}

}

*/

 