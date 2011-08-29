// JavaScript Document
window.onload  = onLoad;
var sprite;
function onLoad()
{

	
	 sprite = new Sprite();
	sprite.lineStyle(3,"0x00ff00");
	sprite.beginFill("0x0000FF",0);
	sprite.drawRect(10,10,100,100);
	sprite.endFill();
	
	addChild(sprite);
	sprite.addEventListener(MouseEvent.MOUSE_DOWN,onDown);
	sprite.addEventListener(MouseEvent.MOUSE_UP,onUp);
	
}
function onDown()
{
	sprite.startDrag();
	
	
}
function onUp()
{
	
	sprite.stopDrag();
}