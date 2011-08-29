// timer class
(function(window) {
extend(Timer,DisplayObject);
 function Timer(t,d )
 {
	  this.initialize(t,d);
 }
	var public = Timer.prototype;
	  public.time=0;
	 public.delay=0;
     public.timer=null;
	 public.currentCount=0; 
	 
	 public.initialize=function(t,d)
	 {
		 
		  this.currentCount=0;
		 this.time = t;
		 this.delay = d;
		 if(!this.delay)
		 {
		  this.delay = 0;
		 }
		
	 }
	 
	 
	 
	 public.start =function()
	 {
		 
			 var obj = this;
			 //trace(this.currentCount ,this.delay);
		 	public.timer = setInterval(timerEvent,this.time);
			function timerEvent()
	 		{
				
				 if(parseInt(obj.delay)!=0 &&  parseInt(obj.currentCount) >=parseInt(obj.delay)-1)
				 {
					//trace(obj.delay,obj.currentCount,obj.delay);
					obj.stop();
					
					//obj.dispatch(TimerEvent.TIMER_COMPLETE);
					 dispatchEvent(TimerEvent.TIMER_COMPLETE,TimerEvent.TIMER_COMPLETE);
				 }else{
					
				 }
				// trace(obj.currentCount);
				
				  obj.currentCount=obj.currentCount+1;
				// obj.dispatch(TimerEvent.TIMER);
				 
				dispatchEvent(TimerEvent.TIMER,TimerEvent.TIMER);
			}
		 
	 }
	/* public.timerEvent = function()
	 {
		 
		 if(parseInt(public.delay)!=0 &&  parseInt(public.currentCount) >=parseInt(public.delay)-1)
		 {
			
			 public.stop();
			 dispatchEvent(TimerEvent.TIMER_COMPLETE,TimerEvent.TIMER_COMPLETE);
		 }else{
		 	
		 }
		  public.currentCount=public.currentCount+1;
		 
		 dispatchEvent(TimerEvent.TIMER,TimerEvent.TIMER);
	 }*/
	 public.stop = function()
	 {
		 var t  = public.timer;
		 clearInterval(t);
	 	 public.currentCount=0;
		 t=null;
	 }
	 
 	  
// standard events
window.TimerEvent =
{
	TIMER:{name:"TIMER",target:window},
	TIMER_COMPLETE:{name:"TIMER_COMPLETE",target:window}
};

window.Timer = Timer;
}(window));	  