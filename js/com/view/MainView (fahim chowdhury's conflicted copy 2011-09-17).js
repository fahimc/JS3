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
  
	this.arrange=function()
	{
		nav.y(30);
		middle.y(70);
		 middle.setHeight(stage.stageHeight()-header.getHeight()-nav.getHeight());
	     middle.setWidth(stage.stageWidth());
		footer.y(stage.stageHeight()-47);
	}

}
window.MainView = MainView;
}(window));