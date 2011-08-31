// JavaScript Document
var container = new Array();
 var timer;
var bg;
var sprite;
var endX=0;
var endY=0;
var timer;
var substract=0;
var down=false;
window.onload  = onLoad;
function onLoad()
{

	bg = new UIElement();
	bg.name = "bg";
	bg.styleName="bg";
	bg.build();
	bg.setStyle();
	bg.setWidth(stage.stageWidth());
	bg.setHeight(stage.stageHeight());
	addChild(bg);

    sprite = new UIElement();
	sprite.name="basketball";
	sprite.styleName="basketball";
		sprite.build();
		sprite.setStyle();
		sprite.setWidth(80);
		sprite.setHeight(80);
		sprite.x(100);
		sprite.y(stage.stageHeight()-sprite.getHeight());
		addChild(sprite);
		sprite.addEventListener(TouchEvent.TOUCH_START,onTouch);
		stage.addEventListener(MouseEvent.MOUSE_DOWN,onTouch);
		sprite.addEventListener(TouchEvent.TOUCH_END,onEndTouch);
		stage.addEventListener(MouseEvent.MOUSE_UP,onEndTouch);
	  
}
function onTouch()
{
	//sprite.removeEventListener(MouseEvent.MOUSE_DOWN,onTouch);
	stage.addEventListener(MouseEvent.MOUSE_MOVE,onMove);
	sprite.addEventListener(TouchEvent.TOUCH_MOVE,onMove);
}
function onMove(event)
{
	if( event.touches)
	{
	 var touch = event.touches[0];
	endX =touch.pageX;
	endY =touch.pageY;
	}
	
}
function onEndTouch()
{
	//sprite.addEventListener(MouseEvent.MOUSE_DOWN,onTouch);
	sprite.removeEventListener(TouchEvent.TOUCH_START,onTouch);
	sprite.removeEventListener(TouchEvent.TOUCH_MOVE,onMove);
	stage.removeEventListener(MouseEvent.MOUSE_MOVE,onMove);
	//sprite.x(endX);
	//sprite.y(endY);
	substract = Math.abs(parseInt(sprite.getX()) - endX)/50;
	timer =new Timer(stage.frameRate,100);
	timer.addEventListener(TimerEvent.TIMER.name,moveBall);
	timer.addEventListener(TimerEvent.TIMER_COMPLETE.name,onTimerComplete);
	timer.start();
}
function moveBall()
{
	
	if(parseInt(sprite.getY())<80 || down==true)
	{
		down=true;
		sprite.y(parseInt(sprite.getY())+5);
	}else{
		sprite.y(parseInt(sprite.getY())-10);
		if(parseInt(sprite.getX())<parseInt(substract))
		{
		    sprite.x(parseInt(sprite.getX())+parseInt(substract));
		}else{
			sprite.x(parseInt(sprite.getX())-parseInt(substract));
		}
	}
	
}
function onTimerComplete()
{
	timer.removeEventListener(TimerEvent.TIMER.name,moveBall);
	timer.removeEventListener(TimerEvent.TIMER_COMPLETE.name,onTimerComplete);
	timer=null;
	down=false;
	timer =new Timer(500,1);
	timer.addEventListener(TimerEvent.TIMER_COMPLETE.name,restart);
	timer.start();
}
function restart()
{
	timer.removeEventListener(TimerEvent.TIMER_COMPLETE.name,restart);
	timer=null;
	sprite.x(100);
	sprite.y(stage.stageHeight()-sprite.getHeight());
}