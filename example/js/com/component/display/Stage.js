(function(window) {
function Stage()
	{}
		extend(Stage,DisplayObject);
		var public = Stage.prototype;
		public.frameRate=31;
		this.element = document.body;
		public.stageWidth = function()
		 {
			
			 var viewportwidth;
				 if (typeof window.innerWidth != 'undefined')
		 		{
			  		viewportwidth = window.innerWidth;
				} else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth !='undefined' && document.documentElement.   clientWidth != 0)
		 		{
			   		viewportwidth = document.documentElement.clientWidth;
				}else
				{
			  		viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
				}
				return viewportwidth;
		 }
		 public.stageHeight =function()
		 {
			  var viewportheight;
				 if (typeof window.innerWidth != 'undefined')
		 		{
			  		viewportheight = window.innerHeight;
				} else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth !='undefined' && document.documentElement.   clientWidth != 0)
		 		{
			   		viewportheight = document.documentElement.clientHeight;
				}else
				{
			  		viewportheight = document.getElementsByTagName('body')[0].clientHeight;
				}
				if(console.debugging)viewportheight=viewportheight-console.getHeight();
				return viewportheight;
		 }
		 
// debugger
function JSDebugger(){}
	extend(JSDebugger,DisplayObject);
	
	var public = JSDebugger.prototype;
	public.debugging=false;
	public.debug =function(boolean)
	{
		
		if(boolean==false)
		{
			this.debugging=false;
		}else{
			this.debugging=true;
			this.name="console"
			this.element = document.createElement('div');
			this.element.setAttribute('id',this.name);	
			this.element.style.overflow = "auto";
			this.element.style.position = "absolute";
			this.setWidth(stage.stageWidth());
		
			this.setHeight(300);
		
			addChild(this);
			this.y(stage.stageHeight());
			this.message("--CONSOLE WINDOW--");
		}
	}
	public.message=function(value)
	{
		var p = document.createElement('p');
		p.style.marginLeft="10px";
		p.style.color="#000";
		p.innerHTML=value;
		this.element.appendChild(p);
		 p=null;
	}
	

window.console= new JSDebugger();
window.stage = new Stage();
}(window));	