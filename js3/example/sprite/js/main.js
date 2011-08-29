// JavaScript Document
window.onload  = onLoad;

function onLoad()
{

	
	var sprite = new Sprite();
	sprite.lineStyle(3,"0x00ff00");
	sprite.beginFill("0x0000FF",0);
	sprite.drawRect(10,10,100,100);
	sprite.endFill();
	
	addChild(sprite);
	
}
