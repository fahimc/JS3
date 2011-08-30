// JavaScript Document
<!--document.write('<scr'+'ipt type="text/javascript" src="js/javascriptToolkit.js" ></scr'+'ipt>');-->
/////////////////////test
window.onload  = onLoad;
var textfield = new TextField();
var obj1 = new UIElement();

function onLoad()
{
	
	obj1.name="steve";
	obj1.styleName="steve";
	obj1.build();
	obj1.setStyle();
	obj1.setWidth(100);
	obj1.setHeight(100);
	obj1.x(20);
	obj1.y(40);
	obj1.alpha(5);
	obj1.buttonMode(true);

	//obj1.addEventListener(MouseEvent.CLICK,onObjectClick);
	obj1.text("click me");
	
	var obj = new UIElement();
	obj.name ="container";
	obj.styleName="container";
	obj.build();
	obj.setStyle();
	addChild(obj);
	obj.setWidth(300);
	obj.setHeight(400);
	obj.text("This is the container");
	obj.y(100);
	obj.x(300);
	
	obj.addChild(obj1);
	obj1.addEventListener(MouseEvent.CLICK,onObjectClick);
	obj.addEventListener(MouseEvent.MOUSE_MOVE,onMouseMove);
	
	textfield.name ="lu";
	textfield.styleName="textfield";
	textfield.build();
	textfield.setStyle();
	addChild(textfield);
	textfield.setWidth(300);
	textfield.setHeight(30);
	textfield.text("This is a textfield");
	textfield.y(10);
	textfield.x(200);
	textfield.addEventListener("focus",onFocus);
	
	var offset = obj1.offsetLeft();
	trace(offset);
	 textfield.text(offset);
//Man();
}
function onMouseMove(ev)
{
	 if(ev.pageX || ev.pageY){ 
	
	  obj1.x(ev.pageX);
	 //textfield.text(offset);
    //return {x:ev.pageX, y:ev.pageY}; 
  } else{
	
	  textfield.text("x: "+ev.clientX+"/"+"y:"+ev.clientY);
	  
   //return { 
    //  x:ev.clientX + document.body.scrollLeft - document.body.clientLeft, 
    //    y:ev.clientY + document.body.scrollTop  - document.body.clientTop 
	//    }; 
  }
}
function onObjectClick(e)
{
	trace("tracing stage width and height");
	trace(Stage.stageWidth(),Stage.stageHieght());
}
function onObjectOut()
{
	trace("onObjectOut");
}

function Person()
{
	Person.prototype.age=23;
}
function Man()
{
	extend(Man,Person)
   Man.prototype.name="john";
	
}


function onFocus(e)
{
	textfield.text("");
	//trace("focus",e.target );
}