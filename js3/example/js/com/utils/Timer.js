// timer class
(function(window) {
 extend(Timer,DisplayObject);
 function Timer(time,delay )
 {
	
	var public = Timer.prototype;
	 public.time = time;
	 public.delay = delay;
	 public.currentCount=0;
	 if(!public.delay)public.delay = 0;
     public.timer;
	  
	 
	 public.start =function()
	 {
		 
		
			
		 	public.timer = setInterval(this.timerEvent,this.time);
			
		 
	 }
	 public.timerEvent = function()
	 {
		 trace("timer");
		 if(parseInt(public.delay)!=0 &&  parseInt(public.currentCount) >=parseInt(public.delay)-1)
		 {
			
			 public.stop();
			public.dispatch(TimerEvent.TIMER_COMPLETE);
		 }else{
		 	
		 }
		// trace(public.dispatch);
		  public.currentCount=public.currentCount+1;
		 public.dispatch(TimerEvent.TIMER);
		 
		// dispatchEvent(TimerEvent.TIMER,TimerEvent.TIMER);
	 }
	 public.stop = function()
	 {
		 var t  = public.timer;
		 clearInterval(t);
	 	 public.currentCount=0;
		 t=null;
	 }
	 
 }		  
// standard events
window.TimerEvent =
{
	TIMER:{name:"TIMER",target:window},
	TIMER_COMPLETE:{name:"TIMER_COMPLETE",target:window}
};

window.Timer = Timer;
}(window));	  