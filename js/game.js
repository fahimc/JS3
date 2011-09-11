// JavaScript Document
META("viewport","width=device-width, user-scalable=no");
//window.onload=main;
(function(window) {
//global variables
var  numPieces = 7;
var spacing = 50;
var offsetX = 120;
var offsetY = 30;

// game grid and mode
var grid;
var gameSprite;
var firstPiece;
var isDropping;
var isSwapping;
var gameScore;
var itemId=0;
//add Stage init
stage.addEventListener(Event.ADDED_TO_STAGE,init);
function init()
{
	
	stage.removeEventListener(Event.ADDED_TO_STAGE,init);
	stage.addEventListener(Event.RESIZE,resize);
	
	
	
	grid = new Array();
	for(var gridrows=0;gridrows<8;gridrows++) {
		grid.push(new Array());
	}
	setUpGrid();
	isDropping = false;
	isSwapping = false;
	gameScore = 0;
	
	//var timer =new Timer(stage.frameRate);
	//timer.addEventListener(TimerEvent.TIMER.name,movePieces);
	stage.addEventListener(Event.ENTER_FRAME,movePieces);
	//timer.start();
	
}
function setUpGrid() 
{
			// loop until valid starting grid
			while (true) {
				// create sprite
				gameSprite = new DisplayObject();
				
				// add 64 random pieces
				for(var col=0;col<8;col++) {
					for(var row=0;row<8;row++) {
						addPiece(col,row);
					}
				}
				
				// try again if matches are present
				if (lookForMatches().length != 0) continue;
				
				// try again if no possible moves
				if (lookForPossibles() == false) continue;
				
				// no matches, but possibles exist: good board found
				break;
			} 
			
			// add sprite
			addChild(gameSprite);
}
function addPiece(col,row) 
{
	var items = new Piece();
	items.styleName= "items";
	items.name = itemId;
	items.src="images/games/items.png";
	items.build();
	items.setStyle();
	items.arrange();
	items.setWidth(50);
	items.setHeight(50);
	items.x(col*spacing+offsetX);
	items.y (row*spacing+offsetY);
	items.col = col;
	items.row = row;
	items.buttonMode(true);
	items.imageDir="vertical";
	items.type = Math.ceil(Math.random()*5);
	items.gotoAndStop(items.type);
	items.addEventListener(MouseEvent.CLICK,clickPiece);
	gameSprite.addChild(items);
	itemId=parseInt(itemId)+1;
			grid[col][row] = items;

			return items;
}
function clickPiece(evt) 
{
	
			//var piece = gameSprite.getChildAt(evt.target.id);
			var piece = findChild(evt.target.id);
			// first one selected
			if (firstPiece == null) {
				
				firstPiece = piece;
				
			// clicked on first piece again
			} else if (firstPiece == piece) {
			
				firstPiece = null;
			
			// clicked on second piece
			} else {
				
				
				// same row, one column over
				if ((firstPiece.row == piece.row) && (Math.abs(firstPiece.col-piece.col) == 1)) {
					makeSwap(firstPiece,piece);
					firstPiece = null;
					
				// same column, one row over
				} else if ((firstPiece.col == piece.col) && (Math.abs(firstPiece.row-piece.row) == 1)) {
					makeSwap(firstPiece,piece);
					firstPiece = null;
					
				// bad move, reassign first piece
				} else {
					firstPiece = piece;
					
				}
			}
}
function findChild(index)
{
	
	for(var a=0; a <gameSprite.numChildren();a++)
	{
		
		if(gameSprite.getChildAt(a).name == index)
		{
			
			return gameSprite.getChildAt(a);
		}
	}
}
function makeSwap(piece1,piece2) 
{
		swapPieces(piece1,piece2);
		
		// check to see if move was fruitful
		if (lookForMatches().length == 0) {
			swapPieces(piece1,piece2);
		} else {
			isSwapping = true;
		}
}
function swapPieces(piece1,piece2) 
{
			// swap row and col values
			var tempCol = piece1.col;
			var tempRow = piece1.row;
			piece1.col = piece2.col;
			piece1.row = piece2.row;
			piece2.col = tempCol;
			piece2.row = tempRow;
			
			// swap grid positions
			grid[piece1.col][piece1.row] = piece1;
			grid[piece2.col][piece2.row] = piece2;
			
}
function movePieces(evt) 
{
			var madeMove = false;
			for(var row=0;row<8;row++) 
			{
				for(var col=0;col<8;col++) 
				{
					if (grid[col][row] != null) 
					{
						 
						// needs to move down
						if (parseInt(grid[col][row].getY()) < parseInt(grid[col][row].row)*parseInt(spacing)+parseInt(offsetY)) {
							
							grid[col][row].y( parseInt(grid[col][row].getY()) + 7);
							madeMove = true;
							
						// needs to move up
						} else if (grid[col][row].getY() > grid[col][row].row*spacing+offsetY) {
							grid[col][row].y( parseInt(grid[col][row].getY()) - 5);
							madeMove = true;
							
						// needs to move right
						} else if (grid[col][row].getX() < grid[col][row].col*spacing+offsetX) {
							grid[col][row].x( parseInt(grid[col][row].getX()) + 5);
							madeMove = true;
							
						// needs to move left
						} else if (grid[col][row].getX() > grid[col][row].col*spacing+offsetX) {
							grid[col][row].x( parseInt(grid[col][row].getX()) - 5);
							madeMove = true;
						}
					}
				}
			// if all dropping is done
			if (isDropping && !madeMove) {
				isDropping = false;
				findAndRemoveMatches();
				
			// if all swapping is done
			} else if (isSwapping && !madeMove) {
				isSwapping = false;
				findAndRemoveMatches();
			}
		}
}
function findAndRemoveMatches() {
			// get list of matches
			var matches = lookForMatches();
			for(var i=0;i<matches.length;i++) {
				var numPoints = (matches[i].length-1)*50;
				for(var j=0;j<matches[i].length;j++) {
					if (gameSprite.contains(matches[i][j])) {
						//var pb = new PointBurst(this,numPoints,matches[i][j].x,matches[i][j].y);
						//addScore(numPoints);
						gameSprite.removeChild(matches[i][j]);
						grid[matches[i][j].col][matches[i][j].row] = null;
						affectAbove(matches[i][j]);
					}
				}
			}
			
			// add any new piece to top of board
			addNewPieces();
			
			// no matches found, maybe the game is over?
			if (matches.length == 0) {
				if (!lookForPossibles()) {
					//endGame();
				}
			}
}
function lookForMatches() 
{
			var matchList = new Array();
			
			// search for horizontal matches
			for (var row=0;row<8;row++) {
				for(var col=0;col<6;col++) {
					var match = getMatchHoriz(col,row);
					if (match.length > 2) {
						matchList.push(match);
						col += match.length-1;
					}
				}
			}
			
			// search for vertical matches
			for(col=0;col<8;col++) {
				for (row=0;row<6;row++) {
					match = getMatchVert(col,row);
					if (match.length > 2) {
						matchList.push(match);
						row += match.length-1;
					}
						
				}
			}
			return matchList;
}
function getMatchHoriz(col,row) 
{
			var match = new Array(grid[col][row]);
			for(var i=1;col+i<8;i++) {
				if (grid[col][row].type == grid[col+i][row].type) {
					match.push(grid[col+i][row]);
				} else {
					return match;
				}
			}
			return match;
}
function getMatchVert(col,row) 
{
			var match = new Array(grid[col][row]);
			for(var i=1;row+i<8;i++) {
				if (grid[col][row].type == grid[col][row+i].type) {
					match.push(grid[col][row+i]);
				} else {
					return match;
				}
			}
			return match;
}
function affectAbove(piece) 
{
			for(var row=piece.row-1;row>=0;row--) {
				if (grid[piece.col][row] != null) {
					grid[piece.col][row].row++;
					grid[piece.col][row+1] = grid[piece.col][row];
					grid[piece.col][row] = null;
				}
			}
}
function addNewPieces() 
{
			for(var col=0;col<8;col++) {
				var missingPieces = 0;
				for(var row=7;row>=0;row--) {
					if (grid[col][row] == null) {
						var newPiece = addPiece(col,row);
						newPiece.y = offsetY-spacing-spacing*missingPieces+1;
						isDropping = true;
					}
				}
			}
}
function lookForPossibles() {
			for(var col=0;col<8;col++) {
				for(var  row=0;row<8;row++) {
					
					// horizontal possible, two plus one
					if (matchPattern(col, row, [[1,0]], [[-2,0],[-1,-1],[-1,1],[2,-1],[2,1],[3,0]])) {
						return true;
					}
					
					// horizontal possible, middle
					if (matchPattern(col, row, [[2,0]], [[1,-1],[1,1]])) {
						return true;
					}
					
					// vertical possible, two plus one
					if (matchPattern(col, row, [[0,1]], [[0,-2],[-1,-1],[1,-1],[-1,2],[1,2],[0,3]])) {
						return true;
					}
					
					// vertical possible, middle
					if (matchPattern(col, row, [[0,2]], [[-1,1],[1,1]])) {
						return true;
					}
				}
			}
			
			// no possible moves found
			return false;
}
function matchPattern(col,row, mustHave, needOne) 
{
			var thisType = grid[col][row].type;
			
			// make sure this has all must-haves
			for(var i=0;i<mustHave.length;i++) {
				if (!matchType(parseInt(col)+parseInt(mustHave[i][0]), parseInt(row)+ parseInt(mustHave[i][1]), thisType)) {
					return false;
				}
			}
			
			// make sure it has at least one need-ones
			for(i=0;i<needOne.length;i++) {
				if (matchType(col+needOne[i][0], row+needOne[i][1], thisType)) {
					return true;
				}
			}
			return false;
		}
		
function matchType(col,row,type) 
{
			// make sure col and row aren't beyond the limit
			if ((col < 0) || (col > 7) || (row < 0) || (row > 7)) return false;
			return (grid[col][row].type == type);
}
function resize()
{

	
}
extend(Piece,MovieClip);
function Piece()
{
	this.col;
	this.row;
}
}(window));