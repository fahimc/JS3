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
		 	this.timer = setInterval(timerEvent,this.time);
			function timerEvent()
	 		{
				
				 if(parseInt(obj.delay)!=0 &&  parseInt(obj.currentCount) >=parseInt(obj.delay)-1)
				 {
					
					obj.stop();
					obj.dispatch(TimerEvent.TIMER_COMPLETE.name);
					
				 }else{
					
				 }
				//trace(public.dispatch);
				
				  obj.currentCount=obj.currentCount+1;
				 obj.dispatch(TimerEvent.TIMER.name);
				 
				// dispatchEvent(TimerEvent.TIMER,TimerEvent.TIMER);
			}
	 }
	 
	 
	 
	 public.stop = function()
	 {
		
		if(this.timer) 
		{
			
			clearInterval(this.timer);
		}
	 	 this.currentCount=0;
		 this.time = 0;
		 this.delay = 0;

	 }
	 
 		  
// standard events
window.TimerEvent =
{
	TIMER:{name:"TIMER",target:window},
	TIMER_COMPLETE:{name:"TIMER_COMPLETE",target:window}
};

window.Timer = Timer;
}(window));	  