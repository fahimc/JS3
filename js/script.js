// JavaScript Document
META("viewport","width=device-width, user-scalable=no");
Embed("images/bg.jpg","Background");
//window.onload=main;
(function(window) {
//global variables

// game grid and mode
var dis;
//add Stage init
stage.addEventListener(Event.ADDED_TO_STAGE,init);
function init()
{
	
	stage.removeEventListener(Event.ADDED_TO_STAGE,init);
	stage.addEventListener(Event.RESIZE,resize);
	
	styleManager.addEventListener(Event.EMBEDS_LOADED,onloadedStyle);
	
	
	
	
}
function onloadedStyle()
{
	styleManager.removeEventListener(Event.EMBEDS_LOADED,onloadedStyle);
	var sp = new Sprite();

	sp.beginFill("#FF0000");
	sp.drawCircle(100,100,50);
	//sp.drawRoundRect(0,0,100,50,5);
	sp.endFill();
	
	var l = new Label();
	l.setWidth(100);
	l.setHeight(100)
	l.build();
	l.setStyle();
	l.arrange();
	l.text("sdjsjdhsj2");
	styleManager.getAssetByName("Background").width=100;
	dis =new DisplayObject();
	dis.background(styleManager.getAssetByName("Background")); 
	dis.setWidth(300);
	dis.setHeight(300);
	addChild(dis);
	dis.addChild(sp);
	dis.addChild(l);
}
function resize()
{
if(dis)
{
	dis.setWidth(stage.stageWidth());
	dis.setHeight(stage.stageHeight());
}
}
}(window));
