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
		sprite.addEventListener(MouseEvent.MOUSE_DOWN,onTouch);
		sprite.addEventListener(TouchEvent.TOUCH_END,onEndTouch);
	  
}
function onTouch()
{
	
	
	sprite.addEventListener(TouchEvent.TOUCH_MOVE,onMove);
}
function onMove(event)
{
	
	 var touch = event.touches[0];
	
	sprite.x(touch.pageX);
	sprite.y(touch.pageY);
}
function onEndTouch()
{
	sprite.removeEventListener(TouchEvent.TOUCH_MOVE,onMove);
}