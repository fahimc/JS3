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
		 
		
			 //trace(this.currentCount ,this.delay);
		 	public.timer = setInterval(this.timerEvent,this.time);
			
		 
	 }
	 public.timerEvent = function()
	 {
		 
		 if(parseInt(public.delay)!=0 &&  parseInt(public.currentCount) >=parseInt(public.delay)-1)
		 {
			
			 public.stop();
		 }else{
		 	
		 }
		  public.currentCount=public.currentCount+1;
		 dispatchEvent(TimerEvent.TIMER_COMPLETE,TimerEvent.TIMER_COMPLETE);
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
	TIMER_COMPLETE:{name:"TIMER_COMPLETE",target:window}
};

window.Timer = Timer;
}(window));	  