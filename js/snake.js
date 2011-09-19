//// JavaScript Document
META("viewport","target-densitydpi=device-dpi, width=device-width, user-scalable=0");
//window.onload=main;
(function(window) {
//global variables

var SPEED  = 120;//lower = faster
var DIM  = 15; //keep this number uneven to have the snake starting in the middle
var INITIAL_SIZE  = 3; //keep this lower then DIM/2

var left ;
var right ;
var up ;
var down ;
var size;
var food ;
var tmr ;
var curI ;
var curJ ;
var snake;
var grid ;
var gridWidth=300;
var titleView;
var tw;
var mid;
var points=0;
var textfield;
var bg;
var title;
var mid;
var score;
var xold ;
var yold;
// game grid and mode

//add Stage init
stage.addEventListener(Event.ADDED_TO_STAGE,init);
function init()
{

	stage.removeEventListener(Event.ADDED_TO_STAGE,init);
	stage.addEventListener(Event.RESIZE,resize);
	
	bg = new UIElement();
	bg.styleName="bg";
	bg.build();
	bg.setStyle();
	bg.setWidth(600);
	bg.setHeight(600);
	bg.arrange();
	
	addChild(bg);
	bg.x((stage.stageWidth()*0.5)-(bg.getWidth() *0.5));
	
	title = new UIElement();
	title.styleName="logo";
	title.build();
	title.setStyle();
	title.setWidth(432);
	title.setHeight(60);
	title.arrange();
	title.visible(false);
	bg.addChild(title);
	title.y(60);
	title.x((bg.getWidth() *0.5)-(title.getWidth() *0.5));
	
	mid = new UIElement();
	mid.styleName="mid";
	mid.build();
	mid.setStyle();
	mid.setWidth(343);
	mid.setHeight(333);
	mid.arrange();
	mid.visible(false);
	bg.addChild(mid);
	mid.y(136);
	mid.x((bg.getWidth() *0.5)-(mid.getWidth() *0.5));
	
	score = new UIElement();
	score.styleName="score";
	score.build();
	score.setStyle();
	score.setWidth(212);
	score.setHeight(78);
	score.arrange();
	score.visible(false);
	bg.addChild(score);
	score.y(483);
	score.x(38);
	
	textfield = new UIElement();
	textfield.styleName="scoreText";
	textfield.build();
	
	textfield.setStyle();
	textfield.setWidth(110);
	textfield.setHeight(50);
	textfield.arrange();
	textfield.visible(false);
	bg.addChild(textfield);
	textfield.y(500);
	textfield.x(130);
	textfield.text("0");
	
	
	buildGame();
	
	titleView = new TitleView();
	titleView.build();
	titleView.setStyle();
	titleView.setWidth(600);
	titleView.setHeight(600);
	titleView.arrange();
	bg.addChild(titleView);
	
	titleView.addEventListener(TITLE_BUTTON_CLICKED,onTitleClick);
	
}
function onTitleClick(e)
{
	textfield.visible(true);
 	bg.visible(true);
 	title.visible(true);
	mid.visible(true);
	score.visible(true);
	middle.visible(true);
	tw = new Tween(titleView,"x",Tween.regularEaseOut,0,-parseInt(titleView.getWidth()),3,onTweenComplete);
	tw.start();
}
function onTweenComplete()
{
	tw.stop();
	tw = null;
	bg.removeChild(titleView);
	titleView = null;
	stage.addEventListener(TouchEvent.TOUCH_START,onTouch);
	stage.addEventListener(TouchEvent.TOUCH_MOVE,onTouchMove);
	stage.addEventListener(MouseEvent.CLICK,onClickMove);

}
function onClickMove(event)
{
	var sn =snake[snake.length-1];
	var xx = Math.abs(stage.mouseX()-bg.getX()-middle.getX());
	var yy =  Math.abs(stage.mouseY()-bg.getY()-middle.getY());
	

	//north
	if (yy < (middle.getHeight() * 0.5))if (!down)	{left = false; up = true;  down = false; right = false;}
	//south
	if (yy > (middle.getHeight() * 0.5)) if (!up)	{left = false; up = false; down = true;  right = false;}
	//east
	if (xx > (middle.getWidth() * 0.5) && yy > (middle.getHeight() * 0.3) && yy < parseInt(middle.getHeight())-(middle.getHeight() * 0.3))if (!left)	{left = false; up = false; down = false; right = true;}
	//west
	if (xx < (middle.getWidth() * 0.5) && yy > (middle.getHeight() * 0.3) && yy < parseInt(middle.getHeight())-(middle.getHeight() * 0.3)) if (!right){left = true;  up = false; down = false; right = false;}


}
function onTouch(event)
{
	
	 if( event.touches)
	{
		
	 	var touch = event.touches[0];
		startX =touch.pageX;
		startY =touch.pageY;
		var xx = startX-bg.getX()-middle.getX();
	var yy =  startY-bg.getY()-middle.getY();
		
	//north
	if (yy < (middle.getHeight() * 0.5))if (!down)	{left = false; up = true;  down = false; right = false;}
	//south
	if (yy > (middle.getHeight() * 0.5)) if (!up)	{left = false; up = false; down = true;  right = false;}
	//east
	if (xx > (middle.getWidth() * 0.5) && yy > (middle.getHeight() * 0.3) && yy < parseInt(middle.getHeight())-(middle.getHeight() * 0.3))if (!left)	{left = false; up = false; down = false; right = true;}
	//west
	if (xx < (middle.getWidth() * 0.5) && yy > (middle.getHeight() * 0.3) && yy < parseInt(middle.getHeight())-(middle.getHeight() * 0.3)) if (!right){left = true;  up = false; down = false; right = false;}
	}
}
function onTouchMove(e)
{
	
}
function buildGame(){
	//size = stage.stageHeight() / DIM;
	DIM = gridWidth / 30;
	curI = curJ = Math.floor(DIM * 0.5);
	
	size = 30;
	
	// build middle
	middle = new UIElement();
	middle.styleName = "middle";
	middle.setWidth(307);
	middle.setHeight(305);
	middle.build();
	middle.setStyle();
	middle.arrange();
	middle.visible(false);
	bg.addChild(middle);
	middle.x(parseInt(mid.getX())+((mid.getWidth() *0.5)-(middle.getWidth() *0.5)));
	middle.y(parseInt(mid.getY())+((mid.getHeight() *0.5)-(middle.getHeight() *0.5)));
	
	initSnake();
	fillGrid();
	placeFood();

	tmr = new Timer(SPEED);
	tmr.addEventListener(TimerEvent.TIMER.name,move);
	tmr.start();

	stage.addEventListener(KeyboardEvent.KEY_DOWN,changeDir);
}
function fillGrid(){
	grid = Make2DArray();

	for (var i = 0; i < DIM; i++){
		for (var j = 0; j < DIM; j++){
			
			var sp = new SnakeItem();
			sp.type=0;
			sp.setWidth(size);
			sp.setHeight(size);
			sp.x(i * size);
			sp.y(j * size);
			sp.build();
			sp.setStyle();
			sp.arrange();
			middle.addChild(sp);
			grid[i][j] = sp;
		}
	}	
}
function Make2DArray(){
	var a = new Array(DIM);
	for(var i = 0; i < a.length; i++){
		a[i] = new Array(DIM);
	}	
	return a;
}
function initSnake(){
	var center = Math.floor(DIM * 0.5) * size;

	snake = new Array(INITIAL_SIZE);

	for (var i = 0; i < INITIAL_SIZE; i++){
		var sp = makeItem();
		sp.x(center);
		sp.y(center + i * size);
		middle.addChild(sp);
		snake[i] = sp;
	}

	snake.reverse();
}
 
function makeItem(c){
	if(!c)c=1;
	var s = new SnakeItem();
	s.type = c;
	s.setWidth(size);
	s.setHeight(size);
	s.build();
	s.setStyle();
	s.arrange();
	return s;
}

function placeFood(){
	var rndI = Math.floor(Math.random() * DIM);
	var rndJ = Math.floor(Math.random() * DIM);

	var rndX = grid[rndI][rndJ].getX();
	var rndY = grid[rndI][rndJ].getY();

	if (food != null) middle.removeChild(food);

	food = makeItem(2);// random color
	food.x(rndX);
	food.y(rndY);

	middle.addChild(food);

	//redo if the food is on the snake itself
	for (var i = 0; i < snake.length; i++){
		if (rndY == snake[i].getY() && rndX == snake[i].getX()){ 
			placeFood();
		}
	} 
}

function move(e){
	
	if (left){
		curI -= 1;
	}else if (right){
		curI += 1;
	}
	if (up){
		curJ -= 1;
	}else if (down){
		curJ += 1;
	}

	if (left || right || up || down){
		var s = makeItem();

		if (curI > DIM - 1) curI = 0;
		if (curJ > DIM - 1) curJ = 0;

		if (curI < 0) curI = DIM - 1;
		if (curJ < 0) curJ = DIM - 1;

		s.x(grid[curI][curJ].getX());
		s.y(grid[curI][curJ].getY());

		middle.addChild(s);
		snake.push(s);


		if (Math.floor(s.getX()) == Math.floor(food.getX()) && Math.floor(s.getY()) == Math.floor(food.getY()) ){
			points = 12 * snake.length;
			textfield.text(String(points));
			placeFood();
		} else {
			middle.removeChild(snake[0]);
			snake.shift();
		}
	}
	//check if dead
	for (var i = 0; i < snake.length; i++){
		for (var a = 0; a < snake.length; a++){
			if (a!=i && snake[a].getY() == snake[i].getY() && snake[a].getX() == snake[i].getX()){ 
				dead();
			}
		}
	} 
}
function dead()
{
	
	tmr.removeEventListener(TimerEvent.TIMER.name,move);
	tmr.stop();
	tmr=null;
	//window.location.reload();
	endView = new EndView();
	endView.scored=points;
	endView.build();
	endView.setStyle();
	endView.setWidth(600);
	endView.setHeight(600);
	endView.arrange();
	bg.addChild(endView);
}
function changeDir(e){
	
	if(e.keyCode == Keyboard.LEFT)	{if (!right){left = true;  up = false; down = false; right = false;}}
	if(e.keyCode == Keyboard.UP)	{if (!down)	{left = false; up = true;  down = false; right = false;}}
	if(e.keyCode == Keyboard.RIGHT)	{if (!left)	{left = false; up = false; down = false; right = true;}}
	if(e.keyCode == Keyboard.DOWN)	{if (!up)	{left = false; up = false; down = true;  right = false;}}
}
function resize()
{

	
}
}(window));