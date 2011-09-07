// JavaScript Document
(function(window) {
extend(MainView,DisplayObject);
function MainView() { 

   
	var public =MainView.prototype;
	public.element =document.createElement('div');
	public.element.style.position = "absolute";
	var middle = new UIElement();
	 var header  = new Header();
	 var nav  = new Nav();
	  var footer  = new Footer();
   this.build =function()
   {
	 
	   
	   header.build();
	   header.arrange();
	   this.addChild(header);
	  
     
	
	 nav.build();
	 nav.arrange();
	 this.addChild(nav);
	 
	  middle.styleName="middle";
	 middle.build();
	 middle.setStyle();
	 middle.setHeight(stage.stageHeight()-header.getHeight()-nav.getHeight());
	 middle.setWidth(stage.stageWidth());
	 middle.arrange();
	 this.addChild(middle);
	 	 
	   footer.build();
	 footer.arrange();
	 this.addChild(footer);

	
	 
   }
  	this.getTopHeight=function()
	{
		return parseInt(header.getHeight())+ parseInt(nav.getHeight());
	}
	this.getMiddleHeight=function()
	{
		
		return parseInt(middle.getHeight()-footer.getHeight());
	}
	this.arrange=function()
	{
	
		header.arrange();
		nav.y(30);
		nav.arrange();
		middle.y(70);
		footer.y(stage.stageHeight()-47);
		footer.arrange();
		 middle.setHeight(stage.stageHeight()-header.getHeight()-nav.getHeight());
	     middle.setWidth(stage.stageWidth());
	}

}
window.MainView = MainView;
}(window));