// JavaScript Document
META("viewport","width=device-width, user-scalable=no");
//window.onload=main;
(function(window) {
//global variables

// game grid and mode

//add Stage init
stage.addEventListener(Event.ADDED_TO_STAGE,init);
function init()
{
	
	stage.removeEventListener(Event.ADDED_TO_STAGE,init);
	stage.addEventListener(Event.RESIZE,resize);
	
	var co = new DisplayObject();
	co.setWidth(100);
	co.setHeight(30);
	co.addStyleName('circleHolder');	

	addChild(co);
	var sp = new Sprite();

	sp.beginFill("#FF0000");
	sp.drawCircle(100,100,50);
	//sp.drawRoundRect(0,0,100,50,5);
	sp.endFill();
	co.addChild(sp);
	
	
}
function resize()
{

	
}
}(window));
