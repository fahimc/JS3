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

    sprite = new Sprite();
		sprite.name = container.length+Math.floor(Math.random()*111111);
		sprite.beginFill("0xFF0000",1);
		sprite.drawRect(0,0,100,100);
		sprite.endFill();
	
    timer = new Timer(50);
	timer.addEventListener(TimerEvent.TIMER.name,onEnterFrame);
	//timer.addEventListener(TimerEvent.TIMER_COMPLETE.name,onTimerComplete);
	timer.start();
	  
}

function onEnterFrame()
{
	//timer.stop();
	var makeShape = Math.floor(Math.random()*11);
	if(makeShape==1)
	{
		 var sp = new Sprite();
		sp.clone(sprite);
		addChild(sp);
		container.push(sp);
		sp.y(Math.floor(Math.random()*stage.stageHeight()));
		//sprite=null;
	}
	makeShape=null;
	for(var a=0; a<container.length;a++ )
	{
		container[a].x(parseInt(container[a].getX())+1);
		if(parseInt(container[a].getX()) > stage.stageWidth())
		{
			container.splice(a,1);
			removeChild(container[a]);
			a=a-1;
		}
	}
	//timer.start();
}