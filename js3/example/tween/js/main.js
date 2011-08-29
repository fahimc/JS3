// JavaScript Document
window.onload  = onLoad;
var t1;
var sprite;
function onLoad()
{

	
	sprite = new Sprite();
	sprite.lineStyle(3,"0x00ff00");
	sprite.beginFill("0x0000FF",0);
	sprite.drawRect(10,10,100,100);
	sprite.endFill();
	
	addChild(sprite);
	
	
	
	t1 = new  Tween(sprite,'alpha',Tween.elasticEaseOut,1,0,4,onTweenComplete);
	t1.start();
}
function onTweenComplete()
{
	sprite.alpha(1);
	t1 = new  Tween(sprite,'x',Tween.elasticEaseOut,0,100,4,onTweenComplete);
	t1.start();
}
///

/** Below is some test-code to verify the most basic functionality **/
function SomeClass(){
	dispatchEvent.call(this);
}
SomeClass.prototype = new dispatchEvent();
 
SomeClass.prototype.sendSomeEvent=function(){
	this.dispatch("test");
}
 
var foo = new SomeClass();
foo.addEventlistener( "test", function(){ alert("bah"); } )
foo.sendSomeEvent();