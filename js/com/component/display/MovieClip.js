(function(window) {
function MovieClip(){
		
		
	}
		extend(MovieClip,UIElement);
		
		var public = MovieClip.prototype;
		public.currentFrame=0;
		public.frameWidth=0;
		public.src ="";
		public.image=new Image();
		public.frameRate =stage.frameRate;
		public.loop=true;
		public.imageDir = "horizontal";
		
		public.setFrameRate=function(value)
		{
			this.frameRate=value;
		}
		public.getFrameRate=function()
		{
			return this.frameRate;
		}
		public.setWidth = function(value)
		{
			
			 this.element.style.width = value+"px";
			 this.frameWidth=value;
		}
		public.setStyle=function ()
		{
			 this.element.setAttribute("class",this.styleName);
				 this.setDefaultStyle();
			// this.image = new Image();
			
			 this.image.src = this.src;
			this.element.style.backgroundImage= 'url('+this.image.src+')';
		}
		public.gotoAndPlay = function(index,toLoop)
		{
			if(toLoop==true||toLoop==false)this.loop=toLoop;
			var clip = this;
			var timer =new Timer(parseInt(this.getFrameRate()));
			timer.addEventListener(TimerEvent.TIMER.name,onFrameTimer);
			timer.start();
			
			function onFrameTimer()
		  {
			
			clip.currentFrame=parseInt(clip.currentFrame)+1;
			
			//trace("0 "+parseInt(public.frameWidth)*parseInt(public.currentFrame)+"");
			//trace('" 0px '+parseInt(parseInt(public.getWidth())*parseInt(public.currentFrame))+'px"');
			//clip.element.style.backgroundPosition="'-"++"px'";
			if(parseInt(clip.frameWidth)*parseInt(clip.currentFrame) >=clip.image.width)
			{
				if(clip.loop)
				{
					clip.currentFrame=0;
				}else{
				  timer.stop();
				  timer.removeEventListener(TimerEvent.TIMER.name,onFrameTimer);
				  timer=null;
				  clip=null;
				}
			}else
			{
				if(clip.imageDir == "horizontal")
				{
					clip.element.style.backgroundPosition =(-parseInt(clip.frameWidth)*parseInt(clip.currentFrame)) + 'px ' + 0 + 'px';
				}else{
					clip.element.style.backgroundPosition =(0 + 'px'+ -parseInt(clip.frameWidth)*parseInt(clip.currentFrame)) + 'px ';
				}
		    }
		   }
		}
		public.gotoAndStop = function(index)
		{
			this.currentFrame=index;
			
			if(this.imageDir == "horizontal")
				{
					this.element.style.backgroundPosition =(-parseInt(this.frameWidth)*parseInt(this.currentFrame)) + 'px ' + 0 + 'px';
				}else{
					
					this.element.style.backgroundPosition =0 + 'px '+ -parseInt(this.frameWidth)*parseInt(this.currentFrame) + 'px';
				}
		}
		
		
		  
window.MovieClip = MovieClip;
}(window));	