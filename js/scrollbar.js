// JavaScript Document
META("viewport","width=device-width, user-scalable=no");
//window.onload=main;
(function(window) {
//global variables

// game grid and mode
var sp
//add Stage init
stage.addEventListener(Event.ADDED_TO_STAGE,init);
function init()
{
	console.debug(true);
	stage.removeEventListener(Event.ADDED_TO_STAGE,init);
	stage.addEventListener(Event.RESIZE,resize);
	
	var co = new DisplayObject();
	co.setWidth(300);
	co.setHeight(50);
	addChild(co);
	
	sp = new Sprite();
	sp.beginFill("#FF0000");
	sp.drawCircle(100,100,50);
	//sp.drawRoundRect(0,0,100,50,5);
	sp.endFill();
	co.addChild(sp);
	sp.startDrag(false);
	//stage.addEventListener(MoueEvent.CLICK,onClick);
	//DragHandler.attach(sp,true,0,0,300,300)
	
	
	
}
function onClick()
	{
		sp.stopDrag();
	}
function resize()
{

	
}
}(window));