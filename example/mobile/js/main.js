// JavaScript Document
var container = new Array();
 var timer;
var bg;
 var sprite
window.onload  = onLoad;
function onLoad()
{

	bg = new UIElement();
	bg.name = "holder";
	bg.styleName="holder";
	bg.build();
	bg.setStyle();
	bg.setWidth(stage.stageWidth());
	bg.setHeight(stage.stageHeight());
	addChild(bg);

    sprite = new UIElement();
	sprite.styleName="red";
		sprite.build();
		sprite.setStyle();
		sprite.setWidth(200);
		sprite.setHeight(200);
		sprite.x(100);
		sprite.y(100);
		addChild(sprite);
	//sprite.rotation(380);
    timer = new Timer(31);
	timer.addEventListener(TimerEvent.TIMER.name,onEnterFrame);
	timer.start();
	  
}

function onEnterFrame()
{
	var rt =parseInt(sprite.getRotation())+1;
	sprite.rotation(rt);
}