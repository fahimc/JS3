
(function(window) {
function dispatchEvent(){
	this.events=[];
}
var public = dispatchEvent.prototype;

public.addEventListener=function(event,callback){
	
	this.events[event] = this.events[event] || [];
	if ( this.events[event] ) {
		this.events[event].push(callback);
	}
	
}
public.removeEventListener=function(event,callback){
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
}
public.dispatch=function(event){
	if ( this.events[event] ) {
		var listeners = this.events[event], len = listeners.length;
		while ( len-- ) {
			listeners[len](this);	//callback with self
		}		
	}
}
 window.dispatchEvent = dispatchEvent;
}(window));	