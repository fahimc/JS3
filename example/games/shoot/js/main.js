// JavaScript Document
window.onload  = onLoad;
var monkey;
var t ;
var t1;
var target;
var currentPoints =0;
var points;
var splash;
var sprite;
function onLoad()
{

	var bg = new UIElement();
	bg.name = "holder";
	bg.styleName="holder";
	bg.build();
	bg.setStyle();
	bg.setWidth(550);
	bg.setHeight(500);
	addChild(bg);

	monkey = new UIElement();
	monkey.name = "monkey";
	monkey.styleName="monkey";
	monkey.build();
	monkey.setStyle();
	monkey.setWidth(199);
	monkey.setHeight(188);
	monkey.startDrag();
	bg.addChild(monkey);
	monkey.y(550+parseInt(monkey.getHeight()));
	
	splat = new UIElement();
	splat.name = "splat";
	splat.styleName="splat";
	splat.build();
	splat.setStyle();
	splat.setWidth(199);
	splat.setHeight(188);
	splat.startDrag();
	splat.visible(false);
	bg.addChild(splat);

	
	var grass = new UIElement();
	grass.name = "grass";
	grass.styleName="grass";
	grass.build();
	grass.setStyle();
	grass.setWidth(550);
	grass.setHeight(319);
	bg.addChild(grass);
	grass.y(500-grass.getHeight());
	
	
	 target = new UIElement();
	target.name = "target";
	target.styleName="target";
	target.build();
	target.setStyle();
	target.setWidth(63);
	target.setHeight(76);
	
	
	addChild(target);
	
	points = new UIElement();
	points.name = "points";
	points.styleName="points";
	points.build();
	points.setStyle();
	points.setWidth(150);
	points.setHeight(30);
	addChild(points);
	points.text("POINTS: 0");
	points.x(500-points.getWidth());
	points.y(20);
    
	sprite = new Sprite();
	sprite.beginFill("0x000000",1);
	sprite.drawRect(0,0,550,500);
	sprite.endFill();
	sprite.alpha(0.7);
	addChild(sprite);
	
	splash = new UIElement();
	splash.name = "splash";
	splash.styleName="splash";
	splash.build();
	splash.setStyle();
	splash.setWidth(384);
	splash.setHeight(225);
	addChild(splash);
	splash.x((sprite.getWidth() * 0.5)-(splash.getWidth() * 0.5));
	splash.y(250-(splash.getHeight() * 0.5));
	splash.addEventListener(MouseEvent.CLICK,removeSplash);
	splash.buttonMode(true);
}
function removeSplash()
{
	
	
	 t1 = new Tween(splash,"alpha",Tween.elasticEaseOut,1,0,1,init);

}
function onClick()
{
	var hitTest =false;
	/*if(parseInt(target.getX())>parseInt(monkey.getX()) && 
	parseInt(target.getX()) < parseInt(monkey.getX())+parseInt(monkey.getWidth()))
	{
		hitTest=true
	}else{
		hitTest=false;
		return;
	}
	if(parseInt(target.getY())>parseInt(monkey.getY()) && 
	parseInt(target.getY()) < parseInt(monkey.getY())+parseInt(monkey.getHeight()))
	{
		hitTest=true;
	}else{
		hitTest=false;
		return;
	}*/
	if(!target.hitTestObject(monkey))return;
	currentPoints++;
	points.text("POINTS: "+currentPoints);
	 if(t1)
	 {
		 t1.stop();
		 
	 }
	monkey.visible(false);
	splat.alpha(1);
	splat.x(monkey.getX());
	splat.y(monkey.getY());
	splat.visible(true);
	 t1 = new Tween(splat,"alpha",Tween.elasticEaseOut,1,0,1,onTimerEvent);
	 
	//trace(target.getX(),monkey.getX());
}
function onTimerEvent()
{
	
}

function init()
{
	splash.visible(false);
	sprite.visible(false);
	removeChild(splash);
	removeChild(sprite);
	target.hideMouse();
	target.startDrag(null,null,(target.getWidth() * 0.5),(target.getHeight() * 0.5));
    target.addEventListener(MouseEvent.CLICK,onClick);
     onMonkeyUp();
	
}
function onMonkeyUp()
{
	monkey.visible(true);
	var xx = Math.floor(Math.random()*(500-parseInt(monkey.getWidth())));
	monkey.x(xx);
	t = new Tween(monkey,"y",Tween.elasticEaseOut,550,100,3,onMonkeyUp);
	t.onMotionFinished=onMonkeyDown;
	t.start();
		
}
function onMonkeyDown()
{
	t = new Tween(monkey,"y",Tween.elasticEaseOut,100,550+parseInt(monkey.getHeight()),2);
	t.onMotionFinished=onMonkeyUp;
	t.start();
}